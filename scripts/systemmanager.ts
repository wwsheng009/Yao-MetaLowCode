import { Process } from "@yao/runtime";
import { updateEntityToYao } from "./sys/entity";
import { getEntitySingleFieldByname, getEntityByNameCache, UnderscoreName, toCamelCase, newUUID } from "./sys/lib";

/**
 * get all tags of entitys
 *
 * yao run scripts.systemmanager.getAllTagsOfEntity
 * @returns
 */
function getAllTagsOfEntity() {
  const data = Process("models.meta.entity.get", {
    select: ["tags"],
    wheres: [
      {
        column: "tags",
        op: "notnull",
      },
      {
        column: "tags",
        op: "ne",
        value: "",
      },
    ],
    limit: 10000,
  });

  const uniqueTags = new Set();

  data.forEach((obj) => {
    let tags = obj.tags.split(",");
    tags.forEach((tag) => uniqueTags.add(tag));
  });

  // Convert the Set back to an array
  const uniqueTagsArray = Array.from(uniqueTags);
  return uniqueTagsArray;
  // return [
  //   "CRM",
  //   "ERP(离散制造-MTO）",
  //   "HRM人事",
  //   "WMS",
  //   "车辆租赁管理系统",
  //   "进销存",
  //   "项目任务管理",
  //   "学习",
  //   "预算费控",
  // ];
}

function filterEntitySet(keyword) {
  return Process("models.meta.entity.get", {
    select: [
      "name",
      "label",
      "entityCode",
      "systemEntityFlag",
      "detailEntityFlag",
      "layoutable",
      "listable",
      "idFieldName",
      "internalEntityFlag",
      "tags",
    ],
    wheres: [
      {
        column: "name",
        op: "like",
        value: `%${keyword}%`,
      },
      {
        method: "orwhere",
        column: "label",
        op: "like",
        value: `%${keyword}%`,
      },
    ],
  });
  // return [
  //   {
  //     name: "User",
  //     label: "用户",
  //     entityCode: 21,
  //     systemEntityFlag: true,
  //     detailEntityFlag: false,
  //     layoutable: true,
  //     listable: true,
  //     idFieldName: "userId",
  //     internalEntityFlag: false,
  //     tags: null,
  //   },
  //   {
  //     name: "Department",
  //     label: "部门",
  //     entityCode: 22,
  //     systemEntityFlag: true,
  //     detailEntityFlag: false,
  //     layoutable: true,
  //     listable: true,
  //     idFieldName: "departmentId",
  //     internalEntityFlag: false,
  //     tags: null,
  //   },
  // ];
}

/**
 * get field of the entity
 *
 * yao run scripts.systemmanager.getFieldSet 'Entity1'
 * @param {string} entity
 * @returns
 */
function getFieldSet(entity) {
  const [row] = Process("models.meta.entity.get", {
    wheres: [
      {
        column: "name",
        value: entity,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          select: ["reserved", "name", "label", "type"],
        },
      },
    },
  });
  return row?.fieldSet || [];

  // return [
  //   {
  //     reserved: true,
  //     name: "metaApiId",
  //     label: "id主键",
  //     type: "PrimaryKey",
  //   },
  //   {
  //     reserved: true,
  //     name: "createdOn",
  //     label: "创建时间",
  //     type: "DateTime",
  //   },
  // ];
}

/**
 * 实体的字段列表
 * yao run scripts.systemmanager.getFieldListOfEntity
 * @param {string} entity 实体标识
 * @returns
 */
function getFieldListOfEntity(entity) {
  const wheres = [];
  wheres.push({ column: "name", value: entity });
  const [row] = Process("models.meta.entity.get", {
    wheres: wheres,
    withs: {
      fieldSet: {
        query: {
          select: [
            "nameFieldFlag",
            "physicalName",
            "reserved",
            "referTo",
            "name",
            "updatable",
            "idFieldFlag",
            "label",
            "creatable",
            "type",
            "mainDetailFieldFlag",
          ],
          orders: [
            {
              column: "fieldId",
              option: "asc",
            },
          ],
        },
      },
    },
  });
  if (row == null) {
    throw new Error(`Entity ${entity} 不存在`);
  }
  row.fieldSet.forEach((field) => {
    if (!field.updatable || !field.creatable) {
      field.reserved = true;
    }
  });
  return row.fieldSet;

  // /**
  //  * 实体主键由实体名称+Id组成
  //  * 当一个实体创建时，以下字段自动的创建
  //  */
  // return [
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "abcaId", //数据库字段
  //     reserved: true, //系统字段
  //     referTo: null, //引用实体
  //     name: "abcaId", //显示名称
  //     updatable: false, //能否手动更新
  //     idFieldFlag: true, //是否主键
  //     label: "id主键", //显示名称
  //     creatable: false, //是否能创建
  //     type: "PrimaryKey", //字段类型
  //     mainDetailFieldFlag: false, //是否主从字段
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "createdOn",
  //     reserved: true,
  //     referTo: null,
  //     name: "createdOn",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "创建时间",
  //     creatable: false,
  //     type: "DateTime",
  //     mainDetailFieldFlag: false,
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "createdBy",
  //     reserved: true,
  //     referTo: "User,",
  //     name: "createdBy",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "创建用户",
  //     creatable: false,
  //     type: "Reference",
  //     mainDetailFieldFlag: false,
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "modifiedOn",
  //     reserved: true,
  //     referTo: null,
  //     name: "modifiedOn",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "最近修改时间",
  //     creatable: false,
  //     type: "DateTime",
  //     mainDetailFieldFlag: false,
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "modifiedBy",
  //     reserved: true,
  //     referTo: "User,",
  //     name: "modifiedBy",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "修改用户",
  //     creatable: false,
  //     type: "Reference",
  //     mainDetailFieldFlag: false,
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "ownerUser",
  //     reserved: true,
  //     referTo: "User,",
  //     name: "ownerUser",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "所属用户",
  //     creatable: false,
  //     type: "Reference",
  //     mainDetailFieldFlag: false,
  //   },
  //   {
  //     nameFieldFlag: false,
  //     physicalName: "ownerDepartment",
  //     reserved: true,
  //     referTo: "Department,",
  //     name: "ownerDepartment",
  //     updatable: false,
  //     idFieldFlag: false,
  //     label: "所属部门",
  //     creatable: false,
  //     type: "Reference",
  //     mainDetailFieldFlag: false,
  //   },
  // ];
}

function getMDFieldList(entityName) {
  const [entity] = Process("models.meta.entity.get", {
    select: ["name"],
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          select: ["name", "label", "type"],
        },
      },
    },
  });

  return {
    subFormList: [],
    storageSetting: [
      {
        cloudStorage: "false",
      },
    ],
    fieldSet: entity.fieldSet,
    //  [
    //   {
    //     name: "entity2Id",
    //     label: "id主键",
    //     type: "PrimaryKey",
    //     required: "1",
    //   },
    //   {
    //     name: "createdOn",
    //     label: "创建时间",
    //     type: "DateTime",
    //     required: "1",
    //   },
    //   {
    //     searchDialogWidth: "520px",
    //     name: "createdBy",
    //     label: "创建用户",
    //     type: "Reference",
    //     required: "1",
    //   },
    //   {
    //     name: "modifiedOn",
    //     label: "最近修改时间",
    //     type: "DateTime",
    //     required: "0",
    //   },
    //   {
    //     searchDialogWidth: "520px",
    //     name: "modifiedBy",
    //     label: "修改用户",
    //     type: "Reference",
    //     required: "0",
    //   },
    //   {
    //     searchDialogWidth: "520px",
    //     name: "ownerUser",
    //     label: "所属用户",
    //     type: "Reference",
    //     required: "1",
    //   },
    //   {
    //     searchDialogWidth: "520px",
    //     name: "ownerDepartment",
    //     label: "所属部门",
    //     type: "Reference",
    //     required: "1",
    //   },
    // ],
  };
}

/**
 * 实体的属性
 * @param {string} entity
 * @returns
 */
function getEntityProps(entity) {
  const wheres = [];
  wheres.push({ column: "name", value: entity });
  const [row] = Process("models.meta.entity.get", {
    wheres: wheres,
    withs: {},
  });
  if (row == null) {
    throw new Error(`Entity ${entity} 不存在`);
  }

  return row;
  // entity = "abc";
  // return {
  //   shareable: false,
  //   mainEntity: null,
  //   listable: true,
  //   entityCode: 1250,
  //   layoutable: true,
  //   nameField: null,
  //   label: "abc",
  //   detailEntityFlag: false,
  //   assignable: false,
  //   tags: "CRM,WMS",
  //   authorizable: true,
  //   physicalName: "t_abca",
  //   name: "Abca",
  // };
}

function hasDetailEntity(entity) {}

/**
 * 增加一个新的字段
 * yao run scripts.systemmanager.addField '::{}' 'User'
 * @param {object} field
 * @param {string} entityName
 * @returns
 */
function addField(field, entityName, notForce?: boolean) {
  // field = {
  //   name: "check", //字段名称
  //   label: "检查", //显示名称
  //   type: "Boolean", //类型
  //   defaultMemberOfListFlag: true, //是否在列表中默认显示
  //   nullable: false, //是否允许空值
  //   creatable: true, //新建记录时允许修改字段
  //   updatable: true, //更新记录时允许修改字段
  //   fieldViewModel: { validators: [] },
  // };
  const wheres = [];
  wheres.push({ column: "name", value: entityName });
  const [row] = Process("models.meta.entity.get", {
    wheres: wheres,
    withs: {},
  });
  if (row == null) {
    throw new Error(`Entity ${entityName} 不存在`);
  }
  const fieldData = getEntitySingleFieldByname(entityName, field.name);
  if (fieldData.fieldId) {
    // return { code: 300, message: `字段：${field.name} 已经存在` };
    throw new Error(`字段：${field.name} 已经存在`);
  }
  const entityCode = row.entityCode;
  field.entityCode = entityCode;
  field.physicalName = field.name;
  // field.owner = {
  //   name: row.name,
  //   label: row.label,
  // };
  field.fieldId = newUUID("2");
  const id = Process("models.meta.field.create", field);
  updateEntityToYao(entityName, notForce);
  getEntityByNameCache(entityName, true);

  // 返回值
  return {
    fieldId: id,
    // entityCode: entityCode,
    // name: "check",
    // label: "检查",
    // physicalName: "c_check", //用户创建的字段会增加c_的前缀
    owner: {
      name: row.name,
      label: row.label,
    },
    // type: "Boolean",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: true,
    updatable: true,
    idFieldFlag: false,
    nameFieldFlag: false,
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: true,
    referTo: null,
    fieldViewModel: {
      validators: [],
    },
    referenceSetting: null,
    ...field,
  };
}

/**
 * update a field definition
 * @param {object} fieldName
 * @param {string} entityName
 */
function updateField(fieldName, entityName) {
  // field = {
  //   name: "s1",
  //   label: "测试",
  //   type: "Text",
  //   defaultMemberOfListFlag: true,
  //   nullable: false,
  //   creatable: true,
  //   updatable: true,
  //   fieldViewModel: { maxLength: 200, minLength: 0, validators: [] },
  //   referenceSetting: [],
  // };

  const Field = getEntitySingleFieldByname(entityName, fieldName.name);
  if (Field.fieldId) {
    Process("models.meta.field.update", Field.fieldId, fieldName);
    updateEntityToYao(entityName);
    getEntityByNameCache(entityName, true);
    return true;
  }
  return fieldName;
}

/**
 * 创建新实体定义
 * @param {object} entity
 * @param {string|null} mainEntity
 * @returns
 */
function createEntity(entity, mainEntity) {
  // mainEntity = null;
  // entity = {
  //   name: "Abca",
  //   label: "abc",
  //   entityCode: null,
  //   layoutable: true,
  //   listable: true,
  //   authorizable: true,
  //   assignable: false,
  //   shareable: false,
  //   mainEntity: "", //主表实例名称
  //   detailEntityFlag: false, //如果是明细表设置成true,并且设置mainEntity
  //   physicalName: "", //新建时为空，
  //   activeType: 1, //1新建，2复制
  //   tags: "CRM,WMS",
  // };
  delete entity.entityCode;

  if (mainEntity) {
    entity.mainEntity = mainEntity;
  }
  const entityName = entity.name;
  const entityLabel = entity.label;

  // 检查是否已经存在同名的实体

  const wheres = [];
  wheres.push({ column: "name", value: entityName });
  const [one] = Process("models.meta.entity.get", {
    wheres: wheres,
    withs: {},
  });
  //如果已经存在
  if (one != null) {
    return { code: 500, error: "实体已存在!", message: null, data: null };
  }
  // add default fieldSet
  const tableName = UnderscoreName(entity.name);
  const idFieldName = toCamelCase(entity.name) + "Id";
  const idFieldLabel = "id主键";

  entity.idFieldName = idFieldName;

  entity.physicalName = tableName;

  const entityCode = Process("models.meta.entity.create", entity);

  const owner = {
    name: entityName,
    label: entityLabel,
  };

  const idField = {
    // fieldId: null,
    entityCode,
    name: idFieldName,
    label: idFieldLabel,
    physicalName: idFieldName,
    // owner,
    type: "PrimaryKey",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: false,
    updatable: false,
    idFieldFlag: true,
    reserved: true,
    nameFieldFlag: false,
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: null,
    fieldViewModel: null,
    referenceSetting: null,
  };

  const createdOnField = {
    // fieldId: null,
    entityCode,
    name: "createdOn",
    label: "创建时间",
    physicalName: "createdOn",
    // owner,
    type: "DateTime",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: null,
    fieldViewModel: null,
    referenceSetting: null,
  };

  const creratedByField = {
    // fieldId: null,
    entityCode,
    name: "createdBy",
    label: "创建用户",
    physicalName: "createdBy",
    // owner,
    type: "Reference",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: "User,",
    fieldViewModel: null,
    referenceSetting: null,
  };
  const modifiedOnField = {
    // fieldId: null,
    entityCode,
    name: "modifiedOn",
    label: "最近修改时间",
    physicalName: "modifiedOn",
    // owner,
    type: "DateTime",
    description: null,
    displayOrder: 0,
    nullable: true,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: null,
    fieldViewModel: null,
    referenceSetting: null,
  };
  const modifiedByField = {
    // fieldId: null,
    entityCode,
    name: "modifiedBy",
    label: "修改用户",
    physicalName: "modifiedBy",
    // owner,
    type: "Reference",
    description: null,
    displayOrder: 0,
    nullable: true,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: "User,",
    fieldViewModel: null,
    referenceSetting: null,
  };
  const ownerUserField = {
    // fieldId: null,
    entityCode,
    name: "ownerUser",
    label: "所属用户",
    physicalName: "ownerUser",
    // owner,
    type: "Reference",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: "User,",
    fieldViewModel: null,
    referenceSetting: null,
  };

  const ownerDepartmentField = {
    // fieldId: null,
    entityCode,
    name: "ownerDepartment",
    label: "所属部门",
    physicalName: "ownerDepartment",
    // owner,
    type: "Reference",
    description: null,
    displayOrder: 0,
    nullable: false,
    creatable: false,
    updatable: false,
    reserved: true,
    idFieldFlag: false,
    nameFieldFlag: false, //名称字段
    mainDetailFieldFlag: false,
    defaultMemberOfListFlag: false,
    referTo: "Department,",
    fieldViewModel: null,
    referenceSetting: null,
  };

  const fieldSet = [
    idField,
    createdOnField,
    creratedByField,
    modifiedOnField,
    modifiedByField,
    ownerUserField,
    ownerDepartmentField,
  ];
  const sortedFieldSet = [
    idField,
    createdOnField,
    creratedByField,
    modifiedOnField,
    modifiedByField,
    ownerUserField,
    ownerDepartmentField,
  ];

  if (mainEntity) {
    const refField = {
      entityCode,
      name: `md${mainEntity}Id`,
      label: "主从关联Id",
      physicalName: `md${mainEntity}Id`,
      type: "Reference",
      description: null,
      displayOrder: 0,
      nullable: false,
      creatable: true,
      updatable: false,
      reserved: true,
      idFieldFlag: false,
      nameFieldFlag: false, //名称字段
      mainDetailFieldFlag: true, //主从字段
      defaultMemberOfListFlag: true, //是否在列表中默认显示
      referTo: `${mainEntity},`,
      fieldViewModel: null,
      referenceSetting: null,
    };
    fieldSet.push(refField);
    sortedFieldSet.push(refField);
  }

  // 先这样处理
  var res = Process("models.meta.field.EachSave", fieldSet, {
    entityCode: entityCode,
  });
  if (res?.code && res.message) {
    throw Error(`Exception:${res?.code}|${res.message}`);
  }

  updateEntityToYao(entity.name);
  getEntityByNameCache(entity, true);
  fieldSet.forEach((f) => (f.owner = owner));
  sortedFieldSet.forEach((f) => (f.owner = owner));

  return {
    ...entity,
    entityId: null,
    // name: entity.name,
    // label: entity.label,
    physicalName: tableName,
    entityCode,
    // detailEntityFlag: false,
    // layoutable: true,
    // listable: true,
    // authorizable: true,
    // shareable: false,
    // assignable: false,
    // tags: "CRM,WMS", //标签值
    idField: {
      name: idFieldName,
      label: idFieldLabel,
    },
    nameField: null,
    detailEntitySet: null,
    mainEntity: null,
    fieldSet,
    sortedFieldSet,
    mainDetailField: null,
    fieldNames: [
      idFieldName,
      "createdOn",
      "createdBy",
      "modifiedOn",
      "modifiedBy",
      "ownerUser",
      "ownerDepartment",
    ],
    virtualFieldSet: [],
  };
}

function copyEntity(entity) {
  const row = getEntityByNameCache(entity, true);

  delete row.entityCode;
  return row;
}

/**
 * 更新实体的描述
 * @param {string} entity
 * @param {string} entityLabel
 */
function updateEntityLabel(entity, entityLabel) {
  // tags = "CRM,WMS,学习,预算费控";
  Process(
    "models.meta.entity.updatewhere",
    {
      wheres: [{ column: "name", value: entity }],
    },
    {
      label: entityLabel,
    }
  );
  return true;
}

/**
 * 更新实体的标签列表
 * @param {string} entity
 * @param {string} tags
 * @returns
 */
function updateEntityTags(entity, tags) {
  // tags = "CRM,WMS,学习,预算费控";
  Process(
    "models.meta.entity.updatewhere",
    {
      wheres: [{ column: "name", value: entity }],
    },
    {
      tags,
    }
  );
  return true;
}

function entityCanBeDeleted(entity) {
  const [{ systemEntityFlag }] = Process("models.meta.entity.get", {
    wheres: [{ column: "name", value: entity }],
  });
  if (systemEntityFlag == true) {
    return false;
  }
  return true;
}

function getEntityByName(entity) {
  const [row] = Process("models.meta.entity.get", {
    wheres: [{ column: "name", value: entity }],
  });

  return row;
}

function deleteEntity(entityName) {
  const entity = getEntityByNameCache(entityName, true);

  Process("models.meta.field.deletewhere", {
    wheres: [{ column: "entityCode", value: entity.entityCode }],
  });
  Process("models.meta.entity.delete", entity.entityCode);

  // Process("session.del", `MetaEntity:${entityName}`);
  // Process("session.del", `MetaEntity:${entity.entityCode}`);
}

function getTextFieldListOfEntity(entity) {
  const [row] = Process("models.meta.entity.get", {
    wheres: [
      {
        column: "name",
        value: entity,
      },
    ],
    withs: {
      fieldSet: {},
    },
  });

  let textFields = [];
  if (row?.fieldSet?.length) {
    row.fieldSet.forEach((field) => {
      if (field.type === "Text") {
        textFields.push({
          name: field.name,
          label: field.label,
          nameFieldFlag: field.nameFieldFlag,
        });
      }
    });
  }

  return textFields;
  // return [
  //   {
  //     nameFieldFlag: false,
  //     name: "str1",
  //     label: "str1",
  //   },
  // ];
}
/**
 * update the entity nameField
 *
 * yao run scripts.systemmanager.updateEntityNameField 'Entity1' 'name1'
 * @param {string} entityName
 * @param {string} nameField
 * @returns
 */
function updateEntityNameField(entityName, nameField) {
  Process(
    "models.meta.entity.updatewhere",
    {
      wheres: [{ column: "name", value: entityName }],
    },
    {
      nameField: nameField,
    }
  );
  // flush the cache
  getEntityByNameCache(entityName, true);
  return true;
}

/**
 * get all the entitys
 *
 * yao run scripts.systemmanager.getEntitySet
 * @returns
 */
function getEntitySet() {
  return Process("models.meta.entity.get", {
    select: [
      "name",
      "label",
      "entityCode",
      "systemEntityFlag",
      "detailEntityFlag",
      "layoutable",
      "listable",
      "idFieldName",
      "internalEntityFlag",
      "tags",
    ],
    orders: [
      {
        column: "entityCode",
        option: "asc",
      },
    ],
    wheres: [
      {
        column: "detailEntityFlag",
        value: false,
      },
      {
        column: "systemEntityFlag",
        value: false,
      },
      {
        column: "internalEntityFlag",
        value: false,
      },
      {
        column: "entityCode",
        value: 1000,
        op: "ge",
      },
    ],
    limit: 10000,
  });
}

function getFieldListOfFilter(entityName) {
  const entity = getEntityByNameCache(entityName);

  const list = [];
  entity.fieldSet.forEach((f) => {
    // 非关联表的信息
    if (f.type !== "Reference") {
      if (f.idFieldFlag !== true) {
        list.push({
          name: f.name,
          label: f.label,
          type: f.type,
          optionData: f.optionList,
        });
      }
    } else {
      //关联表的比较麻烦，暂不处理
      // // 关联表的字段信息
      // const referto = f.referTo.split(",")[0];
      // const refEntity = getEntityByNameCache(referto);
      // list.push({
      //   referTo: referto,
      //   name: f.name,
      //   label: f.label,
      //   type: f.type,
      // });
      // refEntity.fieldSet.forEach((ref) => {
      //   if (ref.idFieldFlag !== true) {
      //   list.push({
      //     referTo: referto,
      //     name: `${referto}-${ref.name}`,
      //     label: `${refEntity.label}-${ref.label}`,
      //     type: ref.type,
      //   });
      // }
      // });
    }
  });

  return list;
}
///-->
/**
 * check if the field can be edit
 *
 * yao run scripts.systemmanager.fieldCanBeEdited 'Entity1' 'b1'
 * @param {string} entity
 * @param {string} field
 * @returns
 */
function fieldCanBeEdited(entity, field) {
  const fieldData = getField(entity, field);
  return !fieldData.reserved;
}

function fieldCanBeDeleted(entity, field) {
  const fieldData = getField(entity, field);
  if (fieldData.reserved) {
    return false;
  }
  return true;
}

function deleteField(entityName, fieldName) {
  const fieldData = getField(entityName, fieldName);
  if (fieldData) {
    Process("models.meta.field.delete", fieldData.fieldId);
    updateEntityToYao(entityName);
    getEntityByNameCache(entityName, true);
  }
}

function addOptionField({ field, optionList }, entity) {
  // data = {
  //   field: {
  //     name: "f1",
  //     label: "f1",
  //     type: "Option",
  //     defaultMemberOfListFlag: true,
  //     nullable: false,
  //     creatable: true,
  //     updatable: true,
  //     validators: [],
  //   },
  //   optionList: [{ key: "f1", value: 1 }],
  // };
  field.optionList = optionList;
  const newField = addField(field, entity);
  return newField;
}

function updateOptionField({ field, optionList }, entity) {
  // const data = {
  //   field: {
  //     name: "o1",
  //     label: "o1",
  //     type: "Option",
  //     defaultMemberOfListFlag: true,
  //     nullable: false,
  //     creatable: true,
  //     updatable: true,
  //     validators: [],
  //     fieldViewModel: null,
  //     referenceSetting: null,
  //     entityCode: 1,
  //   },
  //   optionList: [
  //     { key: "a1", value: 1 },
  //     { key: "aeff", value: 3 },
  //     { key: "a2", value: 2 },
  //   ],
  // };
  field.optionList = optionList;
  return updateField(field, entity);
}
/**
 * Add new Tag Field
 * @param {object} param0
 * @param {string} entity
 * @returns
 */
function addTagField({ field, tagList }, entity) {
  field.tagList = tagList;

  return addField(field, entity);
}

/**
 * update a Tag Field
 * @param {object} param0
 * @param {string} entity
 * @returns
 */
function updateTagField({ field, tagList }, entity) {
  field.tagList = tagList;
  return updateField(field, entity);
}

/**
 * add a reference field
 * @param {object} field
 * @param {string} entity
 * @param {string} refEntity
 */
function addRefField(field, entity, refEntity) {
  // const data = {
  //   name: "r1",
  //   label: "r1",
  //   type: "Reference",
  //   defaultMemberOfListFlag: true,
  //   nullable: false,
  //   creatable: true,
  //   updatable: true,
  //   fieldViewModel: { searchDialogWidth: 520, validators: [] },
  //   referenceSetting: [{ entityName: "User", fieldSet: ["modifiedOn"] }],
  // };

  field.referTo = `${refEntity},`;

  return addField(field, entity);
}

function addAnyRefField(field, entity, referTo) {}

function updateRefField(field, entity, refEntity) {
  // updateRefField?entity=Cangkuguanli&refEntity=User
  const data = {
    name: "cangkuzhuguan",
    label: "仓库主管",
    type: "Reference",
    defaultMemberOfListFlag: true,
    nullable: false,
    creatable: true,
    updatable: true,
    fieldViewModel: { searchDialogWidth: 520, validators: [] },
    referenceSetting: [
      {
        entityName: "User",
        fieldList: [
          "userName",
          "departmentId",
          "jobTitle",
          "mobilePhone",
          "email",
          "tatp",
        ],
      },
    ],
    entityCode: 1006,
  };

  field.referTo = `${refEntity},`;
  return updateField(field, entity);

  // return {
  //   fieldId: null,
  //   entityCode: 1006,
  //   name: "cangkuzhuguan",
  //   label: "仓库主管",
  //   physicalName: "c_cangkuzhuguan",
  //   owner: {
  //     name: "Cangkuguanli",
  //     label: "仓库管理",
  //   },
  //   type: "Reference",
  //   description: null,
  //   displayOrder: 0,
  //   nullable: false,
  //   creatable: true,
  //   updatable: true,
  //   idFieldFlag: false,
  //   nameFieldFlag: false,
  //   mainDetailFieldFlag: false,
  //   defaultMemberOfListFlag: true,
  //   referTo: [
  //     {
  //       name: "User",
  //       label: "用户",
  //     },
  //   ],
  //   fieldViewModel: {
  //     searchDialogWidth: 520,
  //     validators: [],
  //   },
  //   referenceSetting: [
  //     {
  //       entityName: "User",
  //       fieldList: [
  //         "userName",
  //         "departmentId",
  //         "jobTitle",
  //         "mobilePhone",
  //         "email",
  //         "tatp",
  //       ],
  //     },
  //   ],
  // };
}

function updateAnyRefField(field, entity, referTo) {}

/**
 * get entity field
 *
 * yao run scripts.systemmanager.getField 'Entity1' 'b1'
 * @param {string} entity
 * @param {string} field
 * @returns`
 */
function getField(entity, field) {
  return getEntitySingleFieldByname(entity, field);
}

/**
 * get the reference field info
 *
 * yao run scripts.systemmanager.getRefFieldExtras 'WMSgongyingshangxinxi' 'caigoufuzeren'
 * @param {string} entityName
 * @param {string} fieldName
 * @returns
 */
function getRefFieldExtras(entityName, fieldName) {
  // entity = "Entity";
  // field = "r1";
  const fieldData = getEntitySingleFieldByname(entityName, fieldName);
  if (!fieldData) {
    return;
  }

  let selectedFieldItems = [];
  let lables = [];

  const refEntityName = fieldData.referTo.split(",")[0];
  let referenceSetting = fieldData.referenceSetting?.find(
    (item) => item.entityName === refEntityName
  );
  const [referEntity] = Process("models.meta.entity.get", {
    wheres: [{ column: "name", value: refEntityName }],
    withs: {
      fieldSet: {
        query: {
          select: ["reserved", "name", "label", "type"],
          limit: 10000,
        },
      },
    },
  });

  function getLabel(fieldName) {
    const item = referEntity.fieldSet?.find((f) => f.name == fieldName);
    return item?.label || "";
  }
  referenceSetting?.fieldList?.forEach((item) => {
    let label = getLabel(item);
    selectedFieldItems.push({
      name: item,
      label: getLabel(item),
    });
    lables.push(label);
  });

  return {
    refEntityAndFields: `${referEntity.label}[${lables.join(",")},]`,
    selectedFieldItems: selectedFieldItems,
    refEntityName: refEntityName,
    refEntityLabel: referEntity.label,
    refEntityFullName: `${referEntity.label}(${referEntity.name})`,
    currentRefEntity: refEntityName,
    fieldItems: referEntity.fieldSet,
  };
}

/**
 * get all fieldSet with options
 *
 * yao run scripts.systemmanager.getOptionFields
 * 单选项管理,列表
 * @returns
 */
function getOptionFields() {
  const optionList = Process("models.meta.entity.get", {
    select: ["name", "label"],
    withs: {
      fieldSet: {
        query: {
          select: ["name", "label"],
          wheres: [
            {
              column: "optionList",
              op: "notnull",
            },
          ],
        },
      },
    },
  });

  let data = [];
  optionList.forEach((entity) => {
    if (entity?.fieldSet?.length) {
      data.push({
        entityLabel: entity.label,
        entityName: entity.name,
        fieldList: entity.fieldSet.map((o) => {
          return {
            fieldName: o.name,
            fieldLabel: o.label,
          };
        }),
      });
    }
  });
  return data;
}

/**
 * 单选项管理
 * @param {string} entityName
 * @param {string} fieldName
 * @returns
 */
function getOptionItems(entityName, fieldName) {
  const fieldDef = getField(entityName, fieldName);

  return fieldDef?.optionList;

  // entity = "User";
  // field = "jobTitle";

  // return [
  //   {
  //     saved: true,
  //     label: "a1",
  //     value: 1,
  //   },
  //   {
  //     saved: true,
  //     label: "a2",
  //     value: 2,
  //   },
  //   {
  //     saved: true,
  //     label: "a3",
  //     value: 3,
  //   },
  // ];
}

/**
 *
 * @param {string} entityName
 * @param {string} field
 * @param {Array} optionItems
 */
function saveOptionItems(entityName, field, optionItems) {
  // optionItems = [
  //   { label: "a1", saved: true, value: 1 },
  //   { label: "a2", saved: true, value: 2 },
  //   { label: "a3", value: 3, saved: false },
  // ];
  const Field = getEntitySingleFieldByname(entityName, field);
  if (Field.fieldId) {
    const options = optionItems.items.map((item) => {
      return {
        key: item.label,
        value: item.value,
      };
    });
    Process("models.meta.field.update", Field.fieldId, {
      optionList: options,
    });
    // flush the cache
    getEntityByNameCache(entityName, true);
    return true;
  }
  return false;
}

/**
 *
 * yao run scripts.systemmanager.getTagFields
 * @returns
 */
function getTagFields() {
  const entityList = Process("models.meta.entity.get", {
    select: ["name", "label"],
    withs: {
      fieldSet: {
        query: {
          select: ["name", "label"],
          wheres: [
            {
              column: "tagList",
              op: "notnull",
            },
          ],
        },
      },
    },
  });

  let data = [];
  entityList.forEach((entity) => {
    if (entity?.fieldSet?.length) {
      data.push({
        entityLabel: entity.label,
        entityName: entity.name,
        fieldList: entity.fieldSet.map((o) => {
          return {
            fieldName: o.name,
            fieldLabel: o.label,
          };
        }),
      });
    }
  });
  return data;
  // return [
  //   {
  //     entityLabel: "用户",
  //     entityName: "User",
  //     fieldList: [
  //       {
  //         fieldName: "aaaaaa",
  //         fieldLabel: "aaaaa",
  //       },
  //     ],
  //   },
  // ];
}

function getTagItems(entityName, fieldName) {
  const fieldDef = getField(entityName, fieldName);
  return fieldDef.tagList;
}

function saveTagItems(entityName, fieldName, tagItems) {
  // tagItems = {
  //   items: [
  //     { label: "tag11", saved: true, value: "tag11" },
  //     { label: "tag22", saved: true, value: "tag22" },
  //     { label: "tag33", value: "tag33", saved: false },
  //   ],
  // };
  const Field = getEntitySingleFieldByname(entityName, fieldName);
  if (Field?.fieldId) {
    const options = tagItems.items.map((item) => {
      return item.value;
    });
    Process("models.meta.field.update", Field.fieldId, {
      tagList: options,
    });
    getEntityByNameCache(entityName, true);
    return true;
  }

  return false;
}

function postBackupDB() {}

function getNavMenus() {}

/**
 * 获取主实体相关实体数据
 *
 * @param entityCode      实体code
 * @param queryMain       是否查询出主实体
 * @param queryReference  是否查询主实体引用的实体
 * @param queryReferenced 是否查询引用主实体的实体
 * @param querySystem     是否查询系统实体
 * @param queryBuiltIn    是否查询内置实体
 * */
function queryEntityList(
  entityCode,
  queryMain,
  queryReference,
  queryReferenced,
  querySystem,
  queryBuiltIn
) {}
