const { getEntityByNameCache } = Require("sys.lib");

/**
 *
 * @param {*} entityName
 */
function loadEntityToYao(entityName) {
  return;
  const yaoModel = entityToYaoModel(entityName);
  loadYaoModel(yaoModel);
}
/**
 * yao run scripts.sys.yao.updateEntityToYao 'User'
 * @param {string} entityName
 */
function updateEntityToYao(entityName) {
  const yaoModel = entityToYaoModel(entityName);
  loadYaoModel(yaoModel);
  migrateYaoModel(yaoModel);
  return yaoModel;
}

/**
 * convert entity to yao model
 *
 * yao run scripts.sys.yao.entityToYaoModel 'User'
 * @param {string} entityName
 */
function entityToYaoModel(entityName) {
  const entity = getEntityByNameCache(entityName,true);

  if (!entity) {
    throw Error(`实体:${entityName} 不存在`);
  }
  if (!entity.fieldSet) {
    console.log(`实体 ${entityName} 没有字段列表!!!!!!`);
  }
  let yaoModel = {
    name: entity.name,
    label: entity.label,
    table: {
      name: entity.physicalName,
    },
    columns: [
      {
        type: "id",
        name: "autoId",
        label: "id",
        primary:true,
      },
    ],
  };
  yaoModel.columns = yaoModel.columns.concat(
    entity.fieldSet.map((field) => getYaoColumnFromField(field))
  );

  if (entityName === "User") {
    yaoModel.values = [
      {
        userId:"0000021-00000000000000000000000000000001",
        userName: "admin",
        loginName: "admin",
        loginPwd: "admin",
      },
    ];
  }else if  (entityName === "Department") {
    yaoModel.values = [
      {
        departmentId:"0000022-00000000000000000000000000000001",
        departmentName: "公司总部",
      },
    ];
  }

  return yaoModel;
}

function getYaoColumnFromField(field) {
  let column = {
    comment: field.label,
    label: field.label,
    name: field.name,
  };

  // Boolean/Text/Email/Url/Password/TextArea/Integer
  // Decimal/Percent/Money/Date/DateTime
  // Option
  // MultiOption
  // Status
  // Tag
  // Picture
  // File
  // AreaSelect
  // Reference
  // AnyReference
  // ReferenceList

  column.nullable = true;
  switch (field.type) {
    case "PrimaryKey":
      column.type = "char";
      column.length = 40;
      if (field.idFieldFlag) {
        column.unique = true
      }
      column.index = true;
      break;
    case "Url":
    case "Email":
    case "Text":
      column.type = "string";
      
      break;
    case "TextArea":
      column.type = "longText";
      break;
    case "Integer":
      column.type = "integer";
      break;
    case "Decimal":
      column.type = "decimal";
      if (field.fieldViewModel?.precision) {
        column.precision = field.fieldViewModel.precision;
      }
      break;
    case "Money":
      column.type = "decimal";
      if (field.fieldViewModel?.precision) {
        column.precision = field.fieldViewModel.precision;
      }
      break;
    case "Percent":
      column.type = "float";
      break;
    case "Password":
      column.type = "string";
      column.crypt = "PASSWORD";
      break;
    case "MultiOption":
    case "Option":
      column.type = "string";
      // column.option = Array.isArray(field.optionList)
      //   ? field.optionList.map((f) => f.value)
      //   : [];
      break;
    case "Tag":
      column.type = "string";
      // column.option = Array.isArray(field.tagList) ? field.tagList : [];
      break;
    case "Boolean":
      column.type = "boolean";
      break;
    case "Date":
      column.type = "date";
      break;
    case "DateTime":
      column.type = "datetime";
      break;
    case "AnyReference": //一对多引用
    case "ReferenceList": //多对多引用
    case "Reference": //暂时这样处理
      column.type = "string";
      break;
    case "File":
    case "Picture":
      column.type = "json";
      break;
    case "AreaSelect":
      column.type = "json";
      break;
    default:
      column.type = "string";
      break;
  }
  if (field.nullable) {
    column.nullable = true;
  }
  if (field.default) {
    column.default = field.default;
  }
  if (field.description) {
    column.comment = field.description;
  }
  if (field.unique) {
    column.unique = true;
  }
  if (field.index) {
    column.index = true;
  }
  if (field.length) {
    column.length = field.length;
  }

  // if (field.scale) {
  //     column.scale = field.scale;
  // }

  return column;
}
function loadYaoModel(model) {
  const modelId = model.name;
  const fname = `${modelId}.mod.json`;
  let err = Process(`models.${modelId}.load`, fname, JSON.stringify(model));
  if (err?.code && err?.message) {
    throw new Exception(`Message:${err.message},Number:${err.code}`, 500);
  }
}

function migrateYaoModel(model) {
  // console.log("modelYao", modelYao);
  const modelId = model.name;

  // delete all data
  let err = Process(`models.${modelId}.migrate`, true);
  // console.log("migrate err:", err);
  if (err?.Message && err?.Number) {
    const sqlStateString = bytesToString(err.SQLState);

    throw new Exception(
      `Message:${err.Message},Number:${err.Number},SQLState:${sqlStateString}`,
      500
    );
  }
}

module.exports = {
  loadEntityToYao,
  updateEntityToYao,
  entityToYaoModel,
};
