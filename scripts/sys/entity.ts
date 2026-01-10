import { Exception, Process } from "@yao/runtime";
import { getEntityByNameCache, toCamelCase } from "./lib";

/**
 *
 * @param {*} entityName
 */
export function loadEntityToYao(entityName) {
  return;
  const yaoModel = entityToYaoModelByName(entityName);
  loadYaoModel(yaoModel);
}
/**
 * yao run scripts.sys.yao.updateEntityToYao 'User'
 * @param {string} entityName
 */
export function updateEntityToYao(entityName,notForce?:boolean) {
  const yaoModel = entityToYaoModelByName(entityName);
  loadYaoModel(yaoModel);
  migrateYaoModel(yaoModel,notForce);
  return yaoModel;
}

export function completeEntity(entity){
    // check if is the system entity
  if (!entity) {
    throw Error(`实体:${entity.name} 不存在`);
  }
  if (!entity.fieldSet) {
    console.log(`实体 ${entity.name} 没有字段列表!!!!!!`);
  }
  if (!entity.entityCode) {
    entity.entityCode = getSystemEntityCode(entity.name);
  }
  if (entity.entityCode < 1001) {
    entity.systemEntityFlag = true; //内部表
  }
  if (
    typeof entity.mainEntity === "object" &&
    entity.mainEntity &&
    entity.mainEntity.name
  ) {
    entity.mainEntity = entity.mainEntity.name;
  }
  
  entity = updateIdFieldName(entity);
 
  return entity
}
export function entityToYaoModel(entity) {
  entity = completeEntity(entity);
  
  let yaoModel = {
    name: entity.name,
    label: entity.label,
    table: {
      name: entity.physicalName,
    },
    columns: [
      // {
      //   type: "id",
      //   name: "autoId",
      //   label: "id",
      //   primary:true,
      // },
    ],
  };
  yaoModel.columns = yaoModel.columns.concat(
    entity.fieldSet.map((field) => getYaoColumnFromField(field))
  );

  if (entity.name === "User") {
    yaoModel.values = [
      {
        userId:"0000021-00000000000000000000000000000001",
        userName: "admin",
        loginName: "admin",
        loginPwd: "admin",
      },
    ];
  }else if  (entity.name === "Department") {
    yaoModel.values = [
      {
        departmentId:"0000022-00000000000000000000000000000001",
        departmentName: "公司总部",
      },
    ];
  }

  return yaoModel;

}
/**
 * convert metacode entity to yao model
 *
 * yao run scripts.sys.yao.entityToYaoModelByName 'User'
 * @param {string} entityName
 */
export function entityToYaoModelByName(entityName) {
  const entity = getEntityByNameCache(entityName,true);
  return entityToYaoModel(entity);
}

export function getYaoColumnFromField(field) {
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
      column.type = "uuid";
      column.length = 40;
      // if (field.idFieldFlag) {
      //   column.unique = true
      // }
      // column.index = true;
      column.primary = true;
      break;
    case "Url":
    case "Email":
    case "Text":
      if (field.fieldViewModel?.maxLength) {
        column.type = "string";
        column.length = field.fieldViewModel.maxLength;
      }else{
        column.type = "text";
      }
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


  // if (field.scale) {
  //     column.scale = field.scale;
  // }

  return column;
}
export function loadYaoModel(model) {
  const modelId = model.name;
  const fname = `${modelId}.mod.json`;
  let err = Process(`models.${modelId}.load`, fname, JSON.stringify(model));
  if (err?.code && err?.message) {
    throw new Exception(`Message:${err.message},Number:${err.code}`, 500);
  }
}

export function migrateYaoModel(model,notForce) {
  // console.log("modelYao", modelYao);
  const modelId = model.name;
  // delete all data
  let err = Process(`models.${modelId}.migrate`, !notForce);
  // console.log("migrate err:", err);
  if (err?.Message && err?.Number) {
    const sqlStateString = bytesToString(err.SQLState);

    throw new Exception(
      `Message:${err.Message},Number:${err.Number},SQLState:${sqlStateString}`,
      500
    );
  }
}
export function bytesToString(bytes: number[]) {
  let string = '';
  for (let i = 0; i < bytes.length; i++) {
    string += String.fromCharCode(bytes[i]);
  }
  return string;
}

/**
 * 系统entity列表映射
 * @returns
 */
function getSystemEntityMap() {
  //由于前端部分权限检查的代码绑定了实体的代码，实体名称和实体代码的映射关系保持一致
  return {
    OptionItem: 3, //"单选项
    TagItem: 4, //"多选项
    ReferenceListMap: 5, //"多对多中间表
    ReferenceCache: 6, //"名称字段缓存
    SystemSetting: 7, //"系统参数
    FormLayout: 8, //"表单布局
    DataListView: 9, //"数据列表视图
    RouterMenu: 10, //"系统导航菜单
    StatusItem: 12, //"状态项
    LayoutConfig: 15, //"布局设置
    User: 21, //"用户
    Department: 22, //"部门
    Role: 23, //"权限角色
    Team: 24, //"团队
    LoginLog: 25, //"登录日志
    ApprovalConfig: 30, //"审批配置
    ApprovalFlow: 31, //"审批流程
    ApprovalHistory: 32, //"审批历史
    ApprovalTask: 33, //"审批任务
    ReportConfig: 45, //"报表模板
    RecycleBin: 46, //"回收站
    Notification: 47, //"消息通知
    TriggerConfig: 48, //"触发器
    RevisionHistory: 49, //"修改历史
    ShareAccess: 50, //"共享访问
    MetaApi: 51, //"API管理
    Chart: 52, //"仪表盘
    TriggerLog: 53, //"触发器日志
    FollowUp: 54, //"跟进
    TodoTask: 55, //"待办
    BackupDatabase: 56, //"数据库备份
  };
}

export function getSystemEntityCode(entityName) {
  return getSystemEntityMap()[entityName];
}


/**
 * update the fidFieldName for the entity
 *
 * @param {object} entity
 * @returns
 */
export function updateIdFieldName(entity) {
  if (entity.idFieldName) {
    return entity;
  }
  if (!entity.idFieldName) {
    if (Array.isArray(entity.fieldSet)) {
      const primaryField = entity.fieldSet.find((f) => f.idFieldFlag == true);
      if (primaryField) {
        entity.idFieldName = primaryField.name;
      }
    }
  }
  if (!entity.idFieldName) {
    entity.idFieldName = toCamelCase(entity.name) + "Id";
  }
  return entity;
}
