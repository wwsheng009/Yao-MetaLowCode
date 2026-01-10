// ==UserScript==
// @name         拦截并保存页面 fetch/XHR 请求到 IndexedDB（加强早拦截 + POST body）
// @namespace    https://github.com/
// @version      1.1.0
// @description  捕获页面所有网络请求（含早请求、POST body），支持暂停/恢复、URL过滤
// @author       You
// @match        http://localhost:8686/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // 尽可能早地执行（不要等任何东西）
    const DB_NAME = 'NetworkCaptureDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'requests';
    const MAX_RECORDS = 800;
    const DB_READY = initDB();


    let dbPromise = null;

    // ==================== 配置 ====================
    const urlFilters = [
        /\/crud\/checkStatus/i,
        /\/api\/heartbeat/i,
        /\/socket\.io/i,
        /\.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot|ico)(\?.*)?$/i,
        /\/manifest\.json$/i,
        /\/favicon\.ico$/i,
    ];

    let isFiltering = true;
    let isCapturing = true;

    // ===================== IndexedDB 初始化 =====================
    function initDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);

            req.onerror = () => reject(req.error);
            req.onsuccess = () => resolve(req.result);

            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    store.createIndex('time', 'time');
                    store.createIndex('url', 'url');
                }
            };
        });
    }
    // ==============================================

    function shouldFilter(url) {
        return isFiltering && urlFilters.some(r => r.test(url));
    }

    // 延迟初始化 DB，但请求拦截不依赖它完成
    function getDB() {
        if (!dbPromise) {
            dbPromise = new Promise((resolve, reject) => {
                const req = indexedDB.open(DB_NAME, DB_VERSION);

                req.onerror = () => reject(req.error);
                req.onsuccess = () => resolve(req.result);

                req.onupgradeneeded = e => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                        store.createIndex('time', 'time');
                        store.createIndex('url', 'url');
                    }
                };
            });
        }
        return dbPromise;
    }

    async function saveRequest(data) {
        // 紧急 debug 用，看看到底哪个字段是 Promise
        for (const [k, v] of Object.entries(data)) {
            if (v instanceof Promise) {
                console.error(`发现 Promise 字段！ → ${k}`, v);
            }
            if (typeof v === 'object' && v !== null) {
                if ('then' in v && typeof v.then === 'function') {
                    console.error(`疑似 Promise-like 字段！ → ${k}`, v);
                }
            }
        }
        if (!isCapturing || shouldFilter(data.url)) return;

        try {
            const db = await getDB().catch(() => null);
            if (!db) {
                console.warn('[NetworkCapture] DB 未就绪，暂存失败');
                return;
            }

            await new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                tx.oncomplete = resolve;
                tx.onerror = () => reject(tx.error);
                const store = tx.objectStore(STORE_NAME);
                store.add(data);
            });

            cleanupOldRecords().catch(console.warn);
        } catch (e) {
            console.error('[NetworkCapture] 保存失败:', e);
        }
    }
    // ===================== 获取所有记录（用于导出） =====================
    async function getAllRequests() {
        const db = await DB_READY;
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.getAll();

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }



    async function cleanupOldRecords() {
        const db = await getDB().catch(() => null);
        if (!db) return;

        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.index('time').openCursor(null, 'prev');

        const toDelete = [];
        let count = 0;

        req.onsuccess = e => {
            const cursor = e.target.result;
            if (!cursor) {
                if (toDelete.length > 0) {
                    const delTx = db.transaction(STORE_NAME, 'readwrite');
                    const delStore = delTx.objectStore(STORE_NAME);
                    toDelete.forEach(id => delStore.delete(id));
                }
                return;
            }
            count++;
            if (count > MAX_RECORDS) toDelete.push(cursor.value.id);
            cursor.continue();
        };
    }

    // ── 尝试解析 body ─────────────────────────────────────────────
    // ── 尝试解析 body ─────────────────────────────────────────────
    async function tryParseBody(body, contentType = '') {
        if (!body) return null;
        try {
            // 如果 body 本身已经是对象（比如某些库处理过的），直接返回
            if (typeof body === 'object' && !(body instanceof Blob) && !(body instanceof ArrayBuffer)) {
                return body;
            }

            if (typeof body === 'string') {
                // 只要是字符串且看起来像 JSON，就尝试解析
                if (/json/i.test(contentType) || (body.startsWith('{') && body.endsWith('}')) || (body.startsWith('[') && body.endsWith(']'))) {
                    return JSON.parse(body);
                }
                return body;
            }

            if (body instanceof FormData) {
                const obj = {};
                for (const [k, v] of body) obj[k] = v;
                return obj;
            }

            if (body instanceof URLSearchParams) {
                return Object.fromEntries(body);
            }

            return '[unsupported-body-type]';
        } catch (e) {
            // 解析失败则返回原始字符串，不强求
            return body;
        }
    }

    // ── fetch 拦截 ────────────────────────────────────────────────
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const [resource, init = {}] = args;
        const url = resource.url || resource;
        const method = (init.method || 'GET').toUpperCase();
        const start = Date.now();

        // ── 提前解析 request body ──
        let requestBody = null;
        if (['POST','PUT','PATCH'].includes(method) && init.body) {
            try {
                requestBody = await tryParseBody(
                    init.body,
                    init.headers?.['content-type'] || ''
                );
            } catch {
                requestBody = '[body-parse-error]';
            }
        }

        try {
            const res = await originalFetch(...args);
            const clone = res.clone();

            // ── 提前解析 response body ──
            let responseBody = '[not-parsed]';
            try {
                const contentType = res.headers.get('content-type') || '';
                if (/json/i.test(contentType)) {
                    responseBody = await clone.json();
                } else if (contentType.includes('text/')) {
                    responseBody = await clone.text();
                } else {
                    responseBody = '[binary]';
                }
            } catch (e) {
                responseBody = '[response-parse-failed]';
            }

            // 此时 requestBody 和 responseBody 都已经 resolve 完成了
            // 不再是 Promise
            await saveRequest({
                type: 'fetch',
                time: new Date().toISOString(),
                url: String(url),
                method,
                status: res.status,
                duration: Date.now() - start,
                requestHeaders: init.headers || {},
                requestBody,
                responseHeaders: Object.fromEntries(res.headers.entries()),
                responseBody
            });

            return res;
        } catch (e) {
            throw e;
        }
    };

    // ── XHR 拦截增强 ──────────────────────────────────────────────────
    const origXHR = window.XMLHttpRequest;
    const origOpen = origXHR.prototype.open;
    const origSend = origXHR.prototype.send;
    const origSetHeader = origXHR.prototype.setRequestHeader; // 新增

    origXHR.prototype.open = function (method, url, ...rest) {
        this._method = method.toUpperCase();
        this._url = url;
        this._requestHeaders = {}; // 初始化存放 header
        return origOpen.apply(this, [method, url, ...rest]);
    };
    // 拦截并记录请求头
    origXHR.prototype.setRequestHeader = function (header, value) {
        this._requestHeaders[header] = value;
        return origSetHeader.apply(this, arguments);
    };
    origXHR.prototype.send = async function (body) {
        const start = Date.now();
        const xhr = this;

        // 获取 Content-Type
        const ct = xhr._requestHeaders?.['Content-Type'] || xhr._requestHeaders?.['content-type'] || '';

        // 解析 Request Body
        let requestBody = body;
        if (['POST', 'PUT', 'PATCH'].includes(this._method) && body) {
            requestBody = await tryParseBody(body, ct);
        }

        const onLoad = async () => {
            if (!xhr._url || shouldFilter(xhr._url)) return;

            let responseBody = '[not-parsed]';
            try {
                const resCt = xhr.getResponseHeader('content-type') || '';
                if (/json/i.test(resCt)) {
                    responseBody = JSON.parse(xhr.responseText);
                } else if (resCt.includes('text/')) {
                    responseBody = xhr.responseText;
                }
            } catch {
                responseBody = '[resp-parse-failed]';
            }

            await saveRequest({
                type: 'xhr',
                time: new Date().toISOString(),
                url: xhr._url,
                method: xhr._method,
                status: xhr.status,
                duration: Date.now() - start,
                requestHeaders: xhr._requestHeaders, // 保存捕获到的请求头
                requestBody,
                responseHeaders: getXHRHeaders(xhr),
                responseBody
            });
        };

        xhr.addEventListener('load', onLoad, { once: true });
        return origSend.apply(this, arguments);
    };

    function getXHRHeaders(xhr) {
        const headers = {};
        const str = xhr.getAllResponseHeaders();
        if (str) {
            str.split('\r\n').forEach(l => {
                if (!l.trim()) return;
                const [k, ...v] = l.split(': ');
                if (k) headers[k.trim()] = v.join(': ').trim();
            });
        }
        return headers;
    }


    // ===================== 清理超出数量的旧记录 =====================
    async function cleanupOldRecords() {
        const db = await DB_READY;
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const index = store.index('time');

            const req = index.openCursor(null, 'prev');

            let count = 0;
            const toDelete = [];

            req.onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) {
                    if (toDelete.length > 0) {
                        const delTx = db.transaction(STORE_NAME, 'readwrite');
                        const delStore = delTx.objectStore(STORE_NAME);
                        toDelete.forEach(id => delStore.delete(id));
                        delTx.oncomplete = resolve;
                        delTx.onerror = reject;
                    } else {
                        resolve();
                    }
                    return;
                }

                count++;
                if (count > MAX_RECORDS) {
                    toDelete.push(cursor.value.id);
                }
                cursor.continue();
            };

            req.onerror = () => reject(req.error);
        });
    }


    // ===================== 清空数据库 =====================
    async function clearAll() {
        if (!confirm('确定要清空所有捕获的请求记录吗？')) return;
        const db = await DB_READY;
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.clear();

            req.onsuccess = () => {
                console.log('[NetworkCapture] 已清空所有记录');
                resolve();
            };
            req.onerror = () => reject(req.error);
        });
    }


    // ===================== UI 控制按钮 =====================
    window.addEventListener('load', () => {
        const container = document.createElement('div');
        Object.assign(container.style, {
            position: 'fixed',
            right: '16px',
            bottom: '16px',
            zIndex: '9999',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
        });

        const createBtn = (text, bg, clickFn) => {
            const btn = document.createElement('button');
            Object.assign(btn.style, {
                padding: '8px 14px',
                background: bg,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '110px'
            });
            btn.textContent = text;
            btn.onclick = clickFn;
            return btn;
        };

        const toggleCaptureBtn = createBtn('暂停记录', '#e67e22', () => {
            isCapturing = !isCapturing;
            toggleCaptureBtn.textContent = isCapturing ? '暂停记录' : '已暂停 ● 继续';
            toggleCaptureBtn.style.background = isCapturing ? '#e67e22' : '#27ae60';
        });

        const toggleFilterBtn = createBtn('过滤开启', '#8e44ad', () => {
            isFiltering = !isFiltering;
            toggleFilterBtn.textContent = isFiltering ? '过滤开启' : '过滤关闭';
            toggleFilterBtn.style.background = isFiltering ? '#8e44ad' : '#95a5a6';
        });

        const exportBtn = createBtn('导出所有请求', '#2c3e50', async () => {
            try {
                const data = await getAllRequests();
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `network_capture_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
                a.click();
                URL.revokeObjectURL(url);
            } catch (err) {
                alert('导出失败：' + err.message);
            }
        });

        const clearBtn = createBtn('清空记录', '#c0392b', clearAll);

        container.append(toggleCaptureBtn, toggleFilterBtn, exportBtn, clearBtn);
        document.body.appendChild(container);
    });

})();