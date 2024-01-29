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
  const row = Process("models.sys.entity.find",entityName, {});
  if (row == null) {
    throw new Error(`实体 ${entityName} 不存在`);
  }
  return row;
}

function toCamelCase(str) {
  // 首先，使用正则表达式替换所有非字母和数字的字符为一个空格
  str = str.replace(/[^a-zA-Z0-9]+/g, ' ');

  // 然后，将字符串转换为小写，并根据空格分割
  return str
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
          // 第一个单词保持小写，其他单词首字母大写
          return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
}
/**
 * get field by name
 * @param {string} field
 * @param {string} entity
 * @returns
 */
function getEntitySingleFieldByname(entity,field) {
  const [row] = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "name",
        value: entity,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          wheres: [
            {
              column: "name",
              value: field,
            },
          ],
        },
      },
    },
  });
  if (row && row.fieldSet?.length) {
    return row.fieldSet[0];
  }
  return {};
}

module.exports = {
  UnderscoreName,
  getEntityByName,
  getEntityByCode,
  getEntitySingleFieldByname,
  toCamelCase
};
