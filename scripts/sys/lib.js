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

function getEntityByName(entityName) {
  const [row] = Process("models.sys.entity.get", {
    wheres: [{ column: "name", value: entityName }],
  });
  if (row == null) {
    throw new Error(`实体 ${entityName} 不存在`);
  }
  return row;
}

function getEntityByCode(entityName) {
  const row = Process("models.sys.entity.find", entityName, {});
  if (row == null) {
    throw new Error(`实体 ${entityName} 不存在`);
  }
  return row;
}

function toCamelCase(str) {
  // 首先，使用正则表达式替换所有非字母和数字的字符为一个空格
  str = str.replace(/[^a-zA-Z0-9]+/g, " ");

  // 然后，将字符串转换为小写，并根据空格分割
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      // 第一个单词保持小写，其他单词首字母大写
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
/**
 * get field by name
 * @param {string} fieldName
 * @param {string} entityName
 * @returns
 */
function getEntitySingleFieldByname(entityName, fieldName) {
  const entity = getEntityByNameCache(entityName);
  const field = entity.fieldSet.find((f) => f.name === fieldName);
  return field || {};
}

/**
 * 从缓存中读取实体定义
 * @param {number} entityCode
 * @param {boolean} bypass true=忽略缓存
 * @returns
 */
function getEntityByCodeCache(entityCode, bypass) {
  if (!bypass) {
    const entityC = Process("session.get", `MetaEntity:${entityCode}`);
    if (entityC) {
      console.log(`session match:${entityCode}`);
      return entityC;
    }
  }
  const entity = Process("models.sys.entity.find", entityCode, {
    withs: {
      fieldSet: {
        query: {
          // select: ["name", "label", "type"],
          limit: 10000,
        },
      },
    },
  });
  if (!entity) {
    Process("session.del", `MetaEntity:${entityCode}`);
    Process("session.del", `MetaEntity:${entity.name}`);
    throw Error(`实体:${entityCode}不存在`);
  }
  if (!entity?.fieldSet) {
    throw Error(`实体:${entityCode}配置不正确，字段列表不存在`);
  }
  // entityCache[entityName] = entity;
  Process("session.set", `MetaEntity:${entityCode}`, entity);
  Process("session.set", `MetaEntity:${entity.name}`, entity);
  return entity;
}
/**
 * 读取实体定义，优先从缓存中读取
 * @param {string} entityName
 * @param {boolean} bypass true=忽略缓存
 * @returns
 */
function getEntityByNameCache(entityName, bypass) {
  if (!bypass) {
    const entityC = Process("session.get", `MetaEntity:${entityName}`);
    if (entityC) {
      console.log(`session match:${entityName}`);
      return entityC;
    }
  }

  const [entity] = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          // select: ["name", "label", "type"],
          limit: 10000,
        },
      },
    },
  });
  if (!entity) {
    Process("session.del", `MetaEntity:${entityName}`);
    Process("session.del", `MetaEntity:${entity.entityCode}`);
    throw Error(`实体:${entityName}不存在`);
  }
  if (!entity?.fieldSet) {
    throw Error(`实体:${entityName}配置不正确，字段列表不存在`);
  }
  // entityCache[entityName] = entity;
  Process("session.set", `MetaEntity:${entityName}`, entity);
  Process("session.set", `MetaEntity:${entity.entityCode}`, entity);
  return entity;
}
function getCurrentTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  UnderscoreName,
  getEntityByName,
  getEntityByCode,
  getEntitySingleFieldByname,
  toCamelCase,
  getEntityByNameCache,
  getEntityByCodeCache,
  getCurrentTime,
};
