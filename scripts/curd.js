const { loadEntityToYao } = Require("sys.yao");

const { getEntityByName, getEntityByCode } = Require("sys.lib");

function getSelectFields(entity, fieldsList) {
  let fields = [];
  if (fieldsList) {
    fields = fieldsList.split(",");
  } else {
    fields = entity.fieldSet.map((f) => f.name);
  }

  // 筛选哪些选择的字段
  const selectFields = entity.fieldSet.filter((field) =>
    fields.includes(field.name)
  );
  return selectFields;
}

function getfieldsOptionMap(selectFields) {
  // const selectFields = getSelectFields(entity, fieldsList)
  // 有引用关系的字段列表
  const refFields = selectFields.filter((f) => f.type === "Option");

  const refFieldsMap = {};
  refFields.forEach((refField) => {
    refFieldsMap[refField.name] = refField.optionList;
  });
  return refFieldsMap;
}

// function getfieldsTagMap(selectFields) {
//   // const selectFields = getSelectFields(entity, fieldsList)
//   // 有引用关系的字段列表
//   const refFields = selectFields.filter((f) => f.type === "Tag");

//   const refFieldsMap = {};
//   refFields.forEach((refField) => {
//     refFieldsMap[refField.name] = refField.tagList;
//   });
//   return refFieldsMap;
// }
/**
 * get the reference Fields as map object
 * @param {object} entity
 * @param {Array} fieldsList
 * @returns
 */
function getRefFieldsMap(selectFields) {
  // const selectFields = getSelectFields(entity, fieldsList)
  // 有引用关系的字段列表
  const refFields = selectFields.filter((f) => f.type === "Reference");
  // 找到引用实体的id字段与显示字段
  const refFieldsMap = {};
  refFields.forEach((refField) => {
    // 引用的实体名称
    const refEntityName = refField.referTo.split(",")[0];

    const [refEntity] = Process("models.sys.entity.get", {
      select: ["name", "entityCode"],
      wheres: [
        {
          column: "name",
          value: refEntityName,
        },
      ],
      withs: {
        fieldSet: {},
      },
    });
    if (!refEntity) {
      throw Error(`引用实体${refEntityName}不存在`);
    }
    const idFieldName = refEntity.fieldSet.find(
      (f) => f.idFieldFlag === true
    )?.name;
    const nameFieldName = refEntity.fieldSet.find(
      (f) => f.nameFieldFlag === true
    )?.name;
    if (idFieldName && nameFieldName) {
      refFieldsMap[refField.name] = {
        entityCode: refEntity.entityCode,
        entityName: refEntity.name,
        idFieldName,
        nameFieldName,
      };
    }
  });
  return refFieldsMap;
}
function updateDataLineOptions(fieldsOptionMap, line) {
  for (const fieldKey in fieldsOptionMap) {
    if (
      Object.hasOwnProperty.call(fieldsOptionMap, fieldKey) &&
      Object.hasOwnProperty.call(line, fieldKey) &&
      line[fieldKey] != null
    ) {
      line[fieldKey] =
        fieldsOptionMap[fieldKey].find(
          (item) => item.value == line[fieldKey]
        ) || line[fieldKey];
    }
  }
  return line;
}

// function updateDataLineTags(fieldsTagMap, line) {
//   for (const fieldKey in fieldsTagMap) {
//     if (
//       Object.hasOwnProperty.call(fieldsTagMap, fieldKey) &&
//       Object.hasOwnProperty.call(line, fieldKey) &&
//       line[fieldKey] != null
//     ) {
//       line[fieldKey] =
//         fieldsTagMap[fieldKey].find((item) => item == line[fieldKey]) ||
//         line[fieldKey];
//     }
//   }
//   return line;
// }
/**
 * 更新行数据中有引用的数据
 * @param {object} refFieldsMap
 * @param {object} line
 * @returns
 *
 * departmentId: 0000022-00000000000000000000000000000001
 * to 
 * ```
 * departmentId: {
 *  id: "0000022-00000000000000000000000000000001",
 *  name: "公司总部"
 * }
 * ```
 */
function updateDataLineReference(refFieldsMap, line) {
  for (const fieldKey in refFieldsMap) {
    if (
      Object.hasOwnProperty.call(refFieldsMap, fieldKey) &&
      Object.hasOwnProperty.call(line, fieldKey) &&
      line[fieldKey] != null
    ) {
      const refField = refFieldsMap[fieldKey];
      // 引用的对象的值
      const refIdValue = Process(
        `models.${refField.entityName}.find`,
        line[fieldKey],
        {
          select: [refField.idFieldName, refField.nameFieldName],
        }
      );
      if (refIdValue) {
        // 重新组装ID与值
        // refIdValue[refField.idFieldName] = `${refField.entityCode}-${
        //   refIdValue[refField.idFieldName]
        // }`;
        // 重新赋值
        line[fieldKey] = {
          id: `${refField.entityCode}-${refIdValue[refField.idFieldName]}`,
          name: refIdValue[refField.nameFieldName],
        };
      }
    }
  }
  return line;
}

/**
 *
 * 通用查询接口
 * @param {*} mainEntity 实体名称
 * @param {*} fieldsList 要显示的字段列表
 * @param {*} filter { equation="AND", items:[{  "fieldName": "flowName", "op": "LK", "value": "修改"}] }  过滤
 * @param {*} pageSize 默认页数大小
 * @param {*} pageNo 页数大小
 * @param {*} sortFields [{   "fieldName": "entityCode","type": "desc" }] 排序
 * @param {*} advFilter { equation="AND", items:[{  "fieldName": "flowName", "op": "LK", "value": "修改"}] }  常用查询
 * @param {*} quickFilter ""  快速查询
 * @param {*} builtInFilter ""  { equation="AND", items:[{  "fieldName": "flowName", "op": "LK", "value": "修改"}] } 参数查询
 */
function listQuery({
  mainEntity,
  fieldsList,
  filter,
  pageSize,
  pageNo,
  sortFields,
  advFilter,
  quickFilter,
  builtInFilter,
  statistics,
}) {
  //
  // const payload = {
  //   mainEntity: "User",
  //   fieldsList:
  //     "userName, loginName, jobTitle,mobilePhone,departmentId,disabled,createdOn, createdBy, modifiedOn, modifiedBy, departmentId,avatar,dingTalkUserId",
  //   filter: { equation: "OR", items: [] },
  //   pageSize: 20,
  //   pageNo: 1,
  //   sortFields: [{ fieldName: "createdOn", type: "DESC" }],
  // };
  // const data = {
  //   mainEntity: "Entity1",
  //   fieldsList: "test",
  //   filter: { equation: "AND", items: [] },
  //   pageSize: 20,
  //   pageNo: 1,
  //   sortFields: [{ fieldName: "modifiedOn", type: "DESC" }],
  //   advFilter: {},
  //   quickFilter: "",
  //   builtInFilter: {},
  //   statistics: [],
  // };

  const [entity] = Process("models.sys.entity.get", {
    wheres: [{ column: "name", value: mainEntity }],
    withs: {
      fieldSet: {},
    },
  });
  if (entity == null) {
    throw new Error(`实体 ${mainEntity} 不存在`);
  }

  // const entity = getEntityByName(mainEntity);
  loadEntityToYao(mainEntity);

  let queryParam = {};
  if (fieldsList) {
    queryParam.select = fieldsList.split(",");
    if (!queryParam.select.includes(entity.idFieldName)) {
      queryParam.select.push(entity.idFieldName);
    }
  }

  const selectFields = getSelectFields(entity, fieldsList);
  const refFieldsMap = getRefFieldsMap(selectFields);
  const fieldsOptionMap = getfieldsOptionMap(selectFields);
  // const fieldsTagMap = getfieldsTagMap(selectFields);

  // console.log("queryParam data", queryParam);
  let data = Process(
    `models.${mainEntity}.Paginate`,
    queryParam,
    pageNo || 1,
    pageSize || 10
  );

  // console.log("listQuery data", data);
  data.data &&
    data.data.forEach((line) => {
      line[entity.idFieldName] = `${entity.entityCode}-${
        line[entity.idFieldName]
      }`;
      // 还需要处理关联查询，返回id与名称。

      line = updateDataLineReference(refFieldsMap, line);
      line = updateDataLineOptions(fieldsOptionMap, line);
      // line = updateDataLineTags(fieldsTagMap, line);
    });

  return {
    dataList: data.data,
    pagination: {
      pageSize: data.pagesize,
      pageNo: data.page,
      total: data.total,
    },
    columnList: null,
    entityBasicInfo: null,
    statisticsList: null,
  };
  // return {
  //   dataList: [
  //     {
  //       userId: "0000021-4ad8495b30304b4b944afcbf748d982a",
  //       userName: "体验",
  //       loginName: "tiyan",
  //       jobTitle: {
  //         value: 1,
  //         label: "员工",
  //         displayOrder: 5,
  //       },
  //       mobilePhone: "",
  //       departmentId: {
  //         id: "0000022-00000000000000000000000000000001",
  //         name: "公司总部",
  //       },
  //       disabled: false,
  //       createdOn: "2024-01-05 14:29:43",
  //       createdBy: {
  //         id: "0000021-00ec15ca45bc446f9fc36161281733d4",
  //         name: "hyf",
  //       },
  //       modifiedOn: "2024-01-25 18:03:03",
  //       modifiedBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       avatar: null,
  //       dingTalkUserId: null,
  //     },
  //   ],
  //   pagination: {
  //     pageSize: 20,
  //     pageNo: 1,
  //     total: 4,
  //   },
  //   columnList: null,
  //   entityBasicInfo: null,
  //   statisticsList: null,
  // };
}

function checkStatus() {
  return { noteCount: 3 };
}

function formCreateQuery(entityName) {
  const entity = getEntityByName(entityName);

  const [formLayout] = Process("models.formLayout.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });

  return {
    layoutJson: formLayout.layoutJson,
    fieldPropsMap: {},
    formData: {},
    labelData: {},
    deletedFields: [],
  };
}

function testEquation() {}

function refFieldQuery(
  entityName,
  refFieldName,
  pageNo,
  pageSize,
  queryText,
  extraFilter
) {
  // entity=User&refField=departmentId&pageNo=1&pageSize=10&queryText=&extraFilter=&_=1706449697186

  // 先查到关联的实体，
  // 再查询关联实体对的表，
  // 默认显示字段列表在字段的referenceSetting中。

  const [mainEntity] = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          wheres: [
            {
              column: "name",
              value: refFieldName,
            },
          ],
        },
      },
    },
  });

  if (!mainEntity || !mainEntity.fieldSet || !mainEntity.fieldSet[0]) {
    throw Error(`实体${entityName}-字段${refFieldName}不存在`);
  }
  let refField = mainEntity.fieldSet[0];

  // 引用的实体名称
  const refEntityName = refField.referTo.split(",")[0];

  const [refEntity] = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "name",
        value: refEntityName,
      },
    ],
    withs: {
      fieldSet: {},
    },
  });
  if (!refEntity) {
    throw Error(`引用实体${refEntityName}不存在`);
  }

  const idFieldName = refEntity.fieldSet.find(
    (f) => f.idFieldFlag === true
  )?.name;
  const nameFieldName = refEntity.fieldSet.find(
    (f) => f.nameFieldFlag === true
  )?.name;

  // 引用设置中可能有多个配置。
  let defaultFieldList = [];
  if (Array.isArray(refField.referenceSetting)) {
    let refConfig = refField.referenceSetting.find(
      (ref) => ref.entityName === refEntityName
    );
    // 默认的显示字段列表
    defaultFieldList = refConfig?.fieldList || [];
  }

  // Filter objectList by names that exist in filterList
  const filteredList = refEntity.fieldSet.filter((field) =>
    defaultFieldList.includes(field.name)
  );

  const outputFields = filteredList.map((field) => {
    return {
      prop: field.name,
      width: "160",
      label: field.label,
      align: "center",
      type: field.type,
    };
  });
  const data = listQuery({
    mainEntity: refEntityName,
    fieldsList: defaultFieldList.join(","),
    // filter:{
    //   equation:"AND",
    //   items:[
    //     {
    //       fieldName:refFieldName,
    //       op:"EQ",
    //       value:id
    //     }
    //   ]
    // },
    pageSize,
    pageNo,
    // sortFields:[],
    // advFilter:{
    //   equation:"AND",
    //   items:[]
    // },
    // quickFilter:"",
    // builtInFilter:""
  });
  return {
    idFieldName: idFieldName,
    nameFieldName: nameFieldName,
    columnList: outputFields,
    // [
    //   {
    //     prop: "departmentName",
    //     width: "160",
    //     label: "部门名称",
    //     align: "center",
    //     type: "Text",
    //   },
    //   {
    //     prop: "parentDepartmentId",
    //     width: "160",
    //     label: "上级部门",
    //     align: "center",
    //     type: "Reference",
    //   },
    // ],
    dataList: data.dataList,
    //  [
    //   {
    //     departmentId: "0000022-00000000000000000000000000000001",
    //     departmentName: "公司总部",
    //     parentDepartmentId: null,
    //   },
    //   {
    //     departmentId: "0000022-8b698fea6842441d8aafc0d5ba395401",
    //     departmentName: "北京公司",
    //     parentDepartmentId: {
    //       id: "0000022-00000000000000000000000000000001",
    //       name: "公司总部",
    //     },
    //   },
    //   {
    //     departmentId: "0000022-5c081c8aca3b4f18a3e7ced7f81eb0cb",
    //     departmentName: "质量控制部",
    //     parentDepartmentId: {
    //       id: "0000022-8b698fea6842441d8aafc0d5ba395401",
    //       name: "北京公司",
    //     },
    //   },
    // ],
    pagination: data.pagination,
    // {
    //   pageSize: 10,
    //   pageNo: 1,
    //   total: 3,
    // },
  };
}

function getEntity(entityName) {
  const [entity] = Process("models.sys.entity.get", {
    select: ["name"],
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        // query: {
        //   select: ["name", "label", "type"],
        // },
      },
    },
  });
  if (!entity) {
    throw Error(`实体:${entityName}不存在`);
  }
  if (!entity?.fieldSet) {
    throw Error(`实体:${entityName}配置不正确，字段列表不存在`);
  }
  return entity;
}

function getEntityDefaultLayout(entityName) {
  const entity = getEntityByName(entityName);
  const [formLayout] = Process("models.formLayout.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
      {
        column: "layoutName",
        value: "默认表单布局",
      },
    ],
  });
  return formLayout?.layoutJson;
}
/**
 * 表单编辑界面
 * @param {string} entityName
 * @param {string} idstr
 * @returns
 */
function formUpdateQuery(entityName, idstr) {
  // /formUpdateQuery?entity=Department&id=0000022-0018e35999ba4f13af7044d5f8e08f9d&_=1706526706647
  // const entity = getEntityByName(entityName);

  const data = queryById(idstr, null);
  return {
    layoutJson: getEntityDefaultLayout(entityName),
    fieldPropsMap: {},
    formData: data,
    labelData: {},
    deletedFields: [],
  };

  // return {
  //   layoutJson: '',
  //   fieldPropsMap: {},
  //   formData: {
  //     departmentId: "0000022-0018e35999ba4f13af7044d5f8e08f9d",
  //     parentDepartmentId: {
  //       id: "0000022-00000000000000000000000000000001",
  //       name: "公司总部",
  //     },
  //     departmentName: "采购部",
  //     description: "",
  //     departmentOwnerUser: {
  //       id: "0000021-00000000000000000000000000000001",
  //       name: "系统管理员",
  //     },
  //     dingDepartmentId: null,
  //     recordApprovalState: null,
  //   },
  //   labelData: {},
  //   deletedFields: [],
  // };
}

function formatCurrentTime() {
  var now = new Date();
  // Convert to ISO string and split into date and time parts
  var dateTimeParts = now.toISOString().split("T"); // ["YYYY-MM-DD", "HH:MM:SS.sssZ"]
  var datePart = dateTimeParts[0]; // "YYYY-MM-DD"
  // Take the time part, remove milliseconds and timezone information, then split
  var timePart = dateTimeParts[1].split(".")[0]; // "HH:MM:SS"
  return datePart + " " + timePart;
}

/**
 * create or update a entity record
 *
 * yao run scripts.curd.saveRecord
 * @param {string} entityName
 * @param {string} idstr
 * @param {object} formModel
 * @returns
 */
function saveRecord(entityName, idstr, formModel) {
  if (!formModel || !typeof formModel == "object") {
    throw Error(`更新数据，不正确的数据格式：${entityName}`);
  }
  // const entity = getEntityByName(entityName)
  // const entity = getEntityByName(entityName);

  // console.log("formModel", formModel);

  const mainEntity = getEntity(entityName);

  // 查找有哪些明细实体
  const detailEntitys = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "mainEntity",
        value: entityName,
      },
    ],
  });
  const detailEntityMap = {};
  detailEntitys.forEach((e) => {
    detailEntityMap[e.name] = getEntity(e.name);
  });

  loadEntityToYao(entityName);

  // use to collect the detail tables
  const detailNeedUpdateMap = {};

  function updateFieldData(entity, line) {
    // "shuizhong":{"value":4,"label":"电子普票","displayOrder":4}
    // 如果是option,在前端没有修改，会直接把option传到后端。
    const idField = entity.fieldSet.find((f) => f.idFieldFlag == true);
    if (line[idField] != null) {
      const [_, id] = line[idField].split("-");
      line[idField] = id;
    }
    for (const fieldName in line) {
      if (Object.hasOwnProperty.call(line, fieldName)) {
        const field = line[fieldName];

        // 更新Option类对象
        if (field !== null && typeof field == "object") {
          let fieldConfig = entity.fieldSet.find(
            (f) => f.name === fieldName && f.type === "Option"
          );

          if (fieldConfig && field.value != null) {
            line[fieldName] = field.value;
          } else {
            fieldConfig = entity.fieldSet.find(
              (f) => f.name === fieldName && f.type === "Reference"
            );
            if (fieldConfig && field.id != null) {
              line[fieldName] = field.id;
            }
          }
        }
        // 是明细表单，是数组
        if (
          Array.isArray(field) &&
          field.length &&
          detailEntityMap[fieldName]
        ) {
          const detailEntity = detailEntityMap[fieldName];
          field.forEach((l) => {
            l = updateFieldData(detailEntity, l);
          });
          detailNeedUpdateMap[fieldName] = field;
        }
      }
    }
    return line;
  }
  formModel = updateFieldData(mainEntity, formModel);

  const createdTime = formatCurrentTime();
  if (!idstr) {
    formModel = { ...formModel, createdOn: createdTime };
    let id = Process(`models.${entityName}.Create`, formModel);
    idstr = `${mainEntity.entityCode}-${id}`;
  } else {
    const [_, id] = idstr.split("-");
    formModel = { ...formModel, modifiedOn: createdTime };
    Process(`models.${entityName}.update`, id, formModel);
  }

  // 在保存主表数据后，再保存子表的数据
  for (const entityName in detailNeedUpdateMap) {
    if (Object.hasOwnProperty.call(detailNeedUpdateMap, entityName)) {
      const subItems = detailNeedUpdateMap[entityName];
      // 找子表的元数据
      const detailEntity = detailEntityMap[entityName];
      const relatedFieldName = detailEntity.fieldSet.find(
        (f) => f.mainDetailFieldFlag == true
      )?.name;
      const idFieldName = detailEntity.fieldSet.find(
        (f) => f.idFieldFlag == true
      )?.name;
      subItems.forEach((l) => {
        if (l[idFieldName]) {
          l.modifiedOn = createdTime;
        } else {
          l.createdOn = createdTime;
        }
        const [_, id] = idstr.split("-");
        l[relatedFieldName] = id;
        return;
      });
      Process(`models.${entityName}.eachsave`, subItems, {});
    }
  }

  return {
    layoutJson: getEntityDefaultLayout(entityName),
    fieldPropsMap: null,
    formData: queryById(idstr),
    labelData: null,
    deletedFields: null,
  };
}
function deleteRecord({ recordIds, cascades }) {
  // data = { recordIds: [3], cascades: [] };
  // data = { recordIds: [2, 3], cascades: [] };
  recordIds &&
    recordIds.forEach((idstr) => {
      const [entityCode, id] = idstr.split("-");
      const model = getEntityByCode(entityCode).name;
      // Process("yao.model.Delete", model, id);
      Process(`models.${model}.Delete`, id);
    });
}
function initDataList(entity) {}
/**
 * 通用获取实体列表接口（实体+列表页面的实体列表）
 * @param {*} entityName 实体名称
 */
function getEntityCodeList(entityName) {
  // entityName = "ReportConfig";
  const entityList = Process("models.sys.entity.get", {});
  return entityList.map((entity) => {
    return {
      entityCode: entity.entityCode,
      entityName: entity.name,
    };
  });
}

// /**
//  * 通用获取实体列表接口（实体+列表页面的实体列表）
//  * @param {*} entityName 实体名称
//  */
// function getEntityCodeList(entityName) {}
//   return [
//     {
//         "entityCode": 1001,
//         "entityName": "Chanpinxinxi"
//     },
//     {
//         "entityCode": 1002,
//         "entityName": "Chanpinxiaoshoujiagebiao"
//     }]
// }
/**
 * 通用查询详情接口
 *
 * yao run scripts.curd.queryById '1-7'
 * @param {*} entityName 实体ID
 * @param {*} fieldsList 需要获取的字段名称
 */
function queryById(entityId, fieldsList) {
  const [entityCode, id] = entityId.split("-");

  const entity = Process("models.sys.entity.find", entityCode, {
    withs: {
      fieldSet: {},
    },
  });
  if (entity == null) {
    throw new Error(`实体 ${mainEntity} 不存在`);
  }
  const entityName = entity.name;

  if (!fieldsList) {
    const fields = getEntity(entityName).fieldSet;
    fieldsList = fields.map((f) => f.name).join(",");
  }

  loadEntityToYao(entityName);
  let queryParam = {};
  if (fieldsList) {
    queryParam.select = fieldsList.split(",");
    if (!queryParam.select.includes(entity.idFieldName)) {
      queryParam.select.push(entity.idFieldName);
    }
  }
  const selectFields = getSelectFields(entity, fieldsList);

  const refFieldsMap = getRefFieldsMap(selectFields);
  const fieldsOptionMap = getfieldsOptionMap(selectFields);
  // const fieldsTagMap = getfieldsTagMap(selectFields);

  let data = Process(`models.${entity.name}.Find`, id, queryParam);

  data = updateDataLineReference(refFieldsMap, data);
  data = updateDataLineOptions(fieldsOptionMap, data);

  // 子表信息
  // 查找有哪些明细实体
  const detailEntitys = Process("models.sys.entity.get", {
    wheres: [
      {
        column: "mainEntity",
        value: entityName,
      },
    ],
  });
  detailEntitys.forEach((e) => {
    const refEntityName = e.name;
    const refEntity = getEntity(refEntityName);

    // const refFieldsList = refEntity.fieldSet.map((f) => f.name).join(",");

    // const selectFields = getSelectFields(refEntity, refFieldsList);

    const refFieldsMap = getRefFieldsMap(refEntity.fieldSet);
    const fieldsOptionMap = getfieldsOptionMap(refEntity.fieldSet);

    let detailData = Process(`models.${refEntityName}.get`, { limit: 10000 });
    // console.log("find by id ",detailData)
    // return
    detailData.forEach((data) => {
      data = updateDataLineReference(refFieldsMap, data);
      data = updateDataLineOptions(fieldsOptionMap, data);
    });

    data[refEntityName] = detailData;
  });

  // data = updateDataLineTags(fieldsTagMap, data);
  return data;
}

function getEntityFields(entityName) {
  const [row] = Process("models.sys.entity.get", {
    select: ["label", "name"],
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          select: [
            "updatable",
            "name",
            "type",
            "nameFieldFlag",
            "label",
            "nullable",
            "creatable",
            "reserved",
            "referTo",
          ],
        },
      },
    },
  });
  if (row == null) {
    throw new Error(`实体 ${entity} 不存在`);
  }
  return row;
}
/**
 * 通用查询-获取实体字段
 * @param {*} entityCode 实体
 * @param {*} queryReference 是否查询引用实体的字段（单引用）  true or false 默认 false
 * @param {*} queryReserved 是否查询系统字段  true or false 默认 false
 * @param {*} firstReference 是否查询引用字段（不包含引用实体字段）  true or false 默认 false
 */
function queryEntityFields(
  entityCode,
  queryReference,
  queryReserved,
  firstReference
) {
  queryReference = queryReference && queryReference !== "false";
  queryReserved = queryReserved && queryReserved !== "false";
  firstReference = firstReference && firstReference !== "false";
  // entityCode=1066&queryReference=true&queryReserved=true&_=1706357808358
  const row = Process("models.sys.entity.find", entityCode, {
    select: ["label", "name"],
    withs: {
      fieldSet: {
        query: {
          select: [
            "updatable",
            "name",
            "type",
            "nameFieldFlag",
            "label",
            "nullable",
            "creatable",
            "reserved",
            "referTo",
          ],
        },
      },
    },
  });
  if (row == null) {
    throw new Error(`实体 ${entity} 不存在`);
  }
  if (!row.fieldSet) {
    throw new Error(`实体 ${row.name} 存在异常，没有字段列表`);
  }
  row.fieldSet = row.fieldSet.filter((field) => {
    if (field.type === "PrimaryKey") {
      return false;
    }
    if (!queryReserved && field.reserved === true) {
      if (queryReference && field.type === "Reference") {
        return true;
      }
      return false;
    }
    if (!queryReference && field.type === "Reference") {
      if (queryReserved && field.reserved === true) {
        return true;
      }
      return false;
    }
    return true;
  });

  // console.log(row)

  let newFieldSet = row.fieldSet;
  let subFieldSet = [];
  if (queryReference && queryReserved) {
    row.fieldSet.forEach((field) => {
      if (field.type === "Reference") {
        const entityName = field.referTo.split(",")[0];
        const entity = getEntityFields(entityName);
        if (!entity.fieldSet) {
          throw new Error(`实体 ${entityName} 存在异常，没有字段列表`);
        }
        entity.fieldSet = entity.fieldSet.filter((f1) => {
          if (field.type === "PrimaryKey") {
            return false;
          }
          if (queryReserved == "false" && f1.reserved === true) {
            if (queryReference == "true" && f1.type === "Reference") {
              return true;
            }
            return false;
          }
          if (queryReference == "false" && f1.type === "Reference") {
            if (queryReserved == "true" && f1.reserved === true) {
              return true;
            }
            return false;
          }
          return true;
        });
        entity.fieldSet.forEach((f1) => {
          f1.name = `${field.name}.${f1.name}`;
          f1.label = `${field.label}.${f1.label}`;
        });
        subFieldSet = subFieldSet.concat(entity.fieldSet);
      }
    });
    if (!firstReference) {
      newFieldSet = newFieldSet.filter((f) => f.type !== "Reference");
    }
  }
  newFieldSet = newFieldSet.concat(subFieldSet);

  let fields = newFieldSet.map((field) => {
    return {
      isUpdatable: field.updatable,
      fieldName: field.name,
      isNameField: field.nameFieldFlag,
      fieldLabel: field.label,
      isNullable: field.nullable,
      isCreatable: field.creatable,
      fieldType: field.type,
      referenceName: field.referTo ? field.referTo.split(",")[0] : undefined,
      reserved: field.reserved,
    };
  });

  return fields;
  // return [
  //   {
  //     isUpdatable: true,
  //     fieldName: "xiaoshouyuanjiazonge",
  //     isNameField: false,
  //     fieldLabel: "销售原价总额(含税)/元",
  //     isNullable: true,
  //     isCreatable: true,
  //     fieldType: "Money",
  //   }
  // ];
}

/**
 * 分配
 */
function assignRecord(body) {}
/**
 * 共享
 */
function shareRecord(body) {}
/**
 * 取消共享
 */
function cancelShareRecord(body, userType) {}
