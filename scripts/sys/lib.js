/**
 * 处理数据库表名分隔符，把模型标识转换化成表名，在这里一般会有一个命名规范的约束
 *
 * @param {string} pathname
 * @returns pathname
 */
function UnderscoreName(pathname) {
  if (!pathname || !pathname.length) {
    return pathname;
  }
  let str = pathname;
  str = str.replace(/\\/g, "/");
  str = str.replace(/\/\//g, "/");
  str = str.replace(/\//g, "_");
  str = str.replace(/-/g, "_");
  str = str.replace(/\./g, "_");
  let newStr = str.replace(/^_+|_+$/g, "");
  return newStr;
}
module.exports = {
  UnderscoreName,
};
