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

function getfieldsTagMap(selectFields) {
  // const selectFields = getSelectFields(entity, fieldsList)
  // 有引用关系的字段列表
  const refFields = selectFields.filter((f) => f.type === "Tag");

  const refFieldsMap = {};
  refFields.forEach((refField) => {
    refFieldsMap[refField.name] = refField.tagList;
  });
  return refFieldsMap;
}
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

function updateDataLineTags(fieldsTagMap, line) {
  for (const fieldKey in fieldsTagMap) {
    if (
      Object.hasOwnProperty.call(fieldsTagMap, fieldKey) &&
      Object.hasOwnProperty.call(line, fieldKey) &&
      line[fieldKey] != null
    ) {
      line[fieldKey] =
        fieldsTagMap[fieldKey].find((item) => item == line[fieldKey]) ||
        line[fieldKey];
    }
  }
  return line;
}
/**
 * 更新行数据中有引用的数据
 * @param {object} refFieldsMap
 * @param {object} line
 * @returns
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
  //     {
  //       userId: "0000021-00ec15ca45bc446f9fc36161281733d4",
  //       userName: "hyf",
  //       loginName: "huyunfang",
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
  //       createdOn: "2024-01-02 11:03:24",
  //       createdBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       modifiedOn: "2024-01-23 09:39:52",
  //       modifiedBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       avatar: null,
  //       dingTalkUserId: null,
  //     },
  //     {
  //       userId: "0000021-2909a29a118a4a28b294cd410b460751",
  //       userName: "gaoyuhui",
  //       loginName: "gaoyuhui",
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
  //       createdOn: "2024-01-02 10:55:30",
  //       createdBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       modifiedOn: "2024-01-25 15:29:54",
  //       modifiedBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       avatar: null,
  //       dingTalkUserId: null,
  //     },
  //     {
  //       userId: "0000021-00000000000000000000000000000001",
  //       userName: "系统管理员",
  //       loginName: "admin",
  //       jobTitle: {
  //         value: 1,
  //         label: "员工",
  //         displayOrder: 5,
  //       },
  //       mobilePhone: "15215478481",
  //       departmentId: {
  //         id: "0000022-00000000000000000000000000000001",
  //         name: "公司总部",
  //       },
  //       disabled: false,
  //       createdOn: "2020-08-24 14:02:44",
  //       createdBy: {
  //         id: "0000021-00000000000000000000000000000001",
  //         name: "系统管理员",
  //       },
  //       modifiedOn: "2023-11-02 10:26:40",
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

function getEntityFieldSet(entityName){
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
        query: {
          select: ["name", "label", "type"],
        },
      },
    },
  });
  if (!entity?.fieldSet) {
    throw Error(`实体:${entityName}不存在`)
  }
  return entity.fieldSet
}
/**
 * 表单编辑界面
 * @param {string} entityName 
 * @param {string} idstr 
 * @returns 
 */
function formUpdateQuery(entityName, idstr) {
  // /formUpdateQuery?entity=Department&id=0000022-0018e35999ba4f13af7044d5f8e08f9d&_=1706526706647
  const entity = getEntityByName(entityName);


  const [formLayout] = Process("models.formLayout.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },{
        column: "layoutName",
        value: "默认表单布局",
      },
    ],
  });
  // const [entityCode, id] = idstr.split("-");
  // const data = Process(`models.${entityName}.find`,id)

  const fields = getEntityFieldSet(entityName)

  const data = queryById(idstr,fields.map(f=>f.name).join(','))
  return {
    layoutJson: formLayout.layoutJson,
    fieldPropsMap: {},
    formData: data,
    labelData: {},
    deletedFields: [],
  };
  
  // return {
  //   layoutJson:
  //     '{"widgetList":[{"key":40463,"type":"grid","alias":"column-2-grid","category":"container","icon":"column-2-grid","cols":[{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"input","alias":"","icon":"text-field","formItemFlag":true,"options":{"name":"departmentName","keyNameEnabled":false,"keyName":"","label":"部门名称","labelAlign":"","type":"text","defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"readonly":false,"disabled":false,"hidden":false,"clearable":true,"showPassword":false,"required":true,"requiredHint":"","validation":"","validationHint":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"prefixIcon":"","suffixIcon":"","appendButton":false,"appendButtonDisabled":false,"buttonIcon":"custom-search","onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onValidate":"","onAppendButtonClick":""},"nameReadonly":true,"id":"input99603"}],"options":{"name":"gridCol94789","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-94789"},{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"reference","alias":"","icon":"reference-field","formItemFlag":true,"options":{"name":"parentDepartmentId","keyNameEnabled":false,"keyName":"","label":"上级部门","labelAlign":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"disabled":false,"hidden":false,"required":true,"requiredHint":"","validation":"","validationHint":"","newTest":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"prefixIcon":"","suffixIcon":"","buttonIcon":"Search","onCreated":"","onMounted":"","onChange":"","onValidate":""},"nameReadonly":true,"id":"reference28286"}],"options":{"name":"gridCol20275","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":[]},"id":"grid-col-20275"}],"options":{"name":"grid91283","hidden":false,"gutter":12,"colHeight":null,"customClass":[]},"id":"grid91283"},{"key":52901,"type":"grid","alias":"column-2-grid","category":"container","icon":"column-2-grid","cols":[{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"reference","alias":"","icon":"reference-field","formItemFlag":true,"options":{"name":"departmentOwnerUser","keyNameEnabled":false,"keyName":"","label":"部门负责人","labelAlign":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"disabled":false,"hidden":false,"required":false,"requiredHint":"","validation":"","validationHint":"","newTest":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"prefixIcon":"","suffixIcon":"","buttonIcon":"Search","onCreated":"","onMounted":"","onChange":"","onValidate":""},"nameReadonly":true,"id":"reference95876"}],"options":{"name":"gridCol79602","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-79602"},{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[],"options":{"name":"gridCol73374","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-73374"}],"options":{"name":"grid72233","hidden":false,"gutter":12,"colHeight":null,"customClass":[]},"id":"grid72233"},{"type":"textarea","icon":"textarea-field","formItemFlag":true,"options":{"name":"description","keyNameEnabled":false,"keyName":"","label":"部门说明","labelAlign":"","rows":3,"autosize":false,"defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"readonly":false,"disabled":false,"hidden":false,"required":false,"requiredHint":"","validation":"","validationHint":"","customClass":"","labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onValidate":""},"nameReadonly":true,"id":"textarea89661"}],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":[],"functions":"","layoutType":"PC","jsonVersion":3,"dataSources":[],"onFormCreated":"","onFormMounted":"","onFormDataChange":"","onFormValidate":""}}',
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
  // const entity = getEntityByName(entityName);
  loadEntityToYao(entityName);
  if (!idstr) {
    formModel = { ...formModel, createdOn: formatCurrentTime() };
    idstr = Process(`models.${entityName}.Create`, formModel);
  } else {
    const [entityCode, id] = idstr.split("-");
    formModel = { ...formModel, modifiedOn: formatCurrentTime() };

    Process(`models.${entityName}.update`, id, formModel);
  }
  return idstr;
  // return `${entity.entityCode}-${id}`;
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
 * @param {*} entityId 实体ID
 * @param {*} fieldsList 需要获取的字段名称
 */
function queryById(entityId, fieldsList) {
  const [entityCode, id] = entityId.split("-");
  // const entity = getEntityByCode(entityCode);

  const entity = Process("models.sys.entity.find", entityCode, {
    withs: {
      fieldSet: {},
    },
  });
  if (entity == null) {
    throw new Error(`实体 ${mainEntity} 不存在`);
  }

  const entityName = entity.name;

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
  return [
    {
      isUpdatable: true,
      fieldName: "xiaoshouyuanjiazonge",
      isNameField: false,
      fieldLabel: "销售原价总额(含税)/元",
      isNullable: true,
      isCreatable: true,
      fieldType: "Money",
    },
    {
      isUpdatable: true,
      fieldName: "youhuijine",
      isNameField: false,
      fieldLabel: "优惠金额/元",
      isNullable: true,
      isCreatable: true,
      fieldType: "Money",
    },
    {
      isUpdatable: true,
      fieldName: "zhengdanzhekoulv",
      isNameField: false,
      fieldLabel: "整单折扣率%",
      isNullable: false,
      isCreatable: true,
      fieldType: "Percent",
    },
    {
      isUpdatable: true,
      fieldName: "xiaoshoudingdanjine",
      isNameField: false,
      fieldLabel: "销售订单金额(含税)/元",
      isNullable: true,
      isCreatable: true,
      fieldType: "Money",
    },
    {
      isUpdatable: true,
      fieldName: "baojiamaolilv",
      isNameField: false,
      fieldLabel: "报价毛利率%",
      isNullable: false,
      isCreatable: true,
      fieldType: "Percent",
    },
    {
      isUpdatable: true,
      fieldName: "baojiadanbianhao",
      isNameField: true,
      fieldLabel: "报价单编号",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "baojiariqi",
      isNameField: false,
      fieldLabel: "报价日期",
      isNullable: false,
      isCreatable: true,
      fieldType: "Date",
    },
    {
      isUpdatable: true,
      fieldName: "chengbenzongjia",
      isNameField: false,
      fieldLabel: "成本总价",
      isNullable: true,
      isCreatable: true,
      fieldType: "Money",
    },
    {
      isUpdatable: false,
      fieldName: "createdOn",
      isNameField: false,
      fieldLabel: "创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "modifiedOn",
      isNameField: false,
      fieldLabel: "最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "approvalStatus",
      isNameField: false,
      fieldLabel: "审批状态",
      isNullable: true,
      isCreatable: false,
      fieldType: "Status",
    },
    {
      isUpdatable: false,
      fieldName: "lastApprovedOn",
      isNameField: false,
      fieldLabel: "最近审批时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "lastApprovalRemark",
      isNameField: false,
      fieldLabel: "最近审批批注",
      isNullable: true,
      isCreatable: false,
      fieldType: "TextArea",
    },
    {
      isUpdatable: false,
      fieldName: "xuanzekehu.createdOn",
      isNameField: false,
      fieldLabel: "选择客户.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "xuanzekehu.modifiedOn",
      isNameField: false,
      fieldLabel: "选择客户.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kehumingcheng",
      isNameField: true,
      fieldLabel: "选择客户.客户名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kehufenlei",
      isNameField: false,
      fieldLabel: "选择客户.客户分类",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kehulaiyuan",
      isNameField: false,
      fieldLabel: "选择客户.客户来源",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kehubiaoqian",
      isNameField: false,
      fieldLabel: "选择客户.客户标签",
      isNullable: true,
      isCreatable: true,
      fieldType: "Tag",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.jiagedengji",
      isNameField: false,
      fieldLabel: "选择客户.价格等级",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.jiesuanzhouqi",
      isNameField: false,
      fieldLabel: "选择客户.结算周期",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kehusuozaidiqu",
      isNameField: false,
      fieldLabel: "选择客户.客户所在地区",
      isNullable: true,
      isCreatable: true,
      fieldType: "AreaSelect",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.jutidizhi",
      isNameField: false,
      fieldLabel: "选择客户.具体地址",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.fapiaotaitou",
      isNameField: false,
      fieldLabel: "选择客户.发票抬头",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.fapiaoshuihao",
      isNameField: false,
      fieldLabel: "选择客户.发票税号",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.shuizhong",
      isNameField: false,
      fieldLabel: "选择客户.税种",
      isNullable: true,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.zengzhishuishuilv",
      isNameField: false,
      fieldLabel: "选择客户.增值税税率",
      isNullable: true,
      isCreatable: true,
      fieldType: "Percent",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kaihudianhua",
      isNameField: false,
      fieldLabel: "选择客户.开户电话",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.shoupiaoyouxiang",
      isNameField: false,
      fieldLabel: "选择客户.收票邮箱",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.kaihuyinhang",
      isNameField: false,
      fieldLabel: "选择客户.开户银行",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "xuanzekehu.yinhangzhanghu",
      isNameField: false,
      fieldLabel: "选择客户.银行账户",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: false,
      fieldName: "chukucangku.createdOn",
      isNameField: false,
      fieldLabel: "出库仓库.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "chukucangku.modifiedOn",
      isNameField: false,
      fieldLabel: "出库仓库.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkumingcheng",
      isNameField: true,
      fieldLabel: "出库仓库.仓库名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkubianma",
      isNameField: false,
      fieldLabel: "出库仓库.仓库编码",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkudizhi",
      isNameField: false,
      fieldLabel: "出库仓库.仓库地区",
      isNullable: false,
      isCreatable: true,
      fieldType: "AreaSelect",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkurongliang",
      isNameField: false,
      fieldLabel: "出库仓库.仓库容量/立方",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkuxingzhi",
      isNameField: false,
      fieldLabel: "出库仓库.仓库性质",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.cangkuzhuangtai",
      isNameField: false,
      fieldLabel: "出库仓库.仓库状态",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.lianxidianhua",
      isNameField: false,
      fieldLabel: "出库仓库.联系电话",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.beizhuxinxi",
      isNameField: false,
      fieldLabel: "出库仓库.备注信息",
      isNullable: true,
      isCreatable: true,
      fieldType: "TextArea",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.jutidizhi",
      isNameField: false,
      fieldLabel: "出库仓库.具体地址",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.zongrukushuliang",
      isNameField: false,
      fieldLabel: "出库仓库.总入库数量",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.zongchukushuliang",
      isNameField: false,
      fieldLabel: "出库仓库.总出库数量",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.dangqiankucunshu",
      isNameField: false,
      fieldLabel: "出库仓库.当前库存数",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.kucundongjieshuliang",
      isNameField: false,
      fieldLabel: "出库仓库.库存冻结数量",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: true,
      fieldName: "chukucangku.dangqiankeyongkucunshuliang",
      isNameField: false,
      fieldLabel: "出库仓库.当前可用库存数量",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: false,
      fieldName: "createdBy.createdOn",
      isNameField: false,
      fieldLabel: "创建用户.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "createdBy.modifiedOn",
      isNameField: false,
      fieldLabel: "创建用户.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.userName",
      isNameField: true,
      fieldLabel: "创建用户.用户名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.loginPwd",
      isNameField: false,
      fieldLabel: "创建用户.登录密码",
      isNullable: false,
      isCreatable: true,
      fieldType: "Password",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.loginName",
      isNameField: false,
      fieldLabel: "创建用户.登录账号名",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.jobTitle",
      isNameField: false,
      fieldLabel: "创建用户.职务",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.disabled",
      isNameField: false,
      fieldLabel: "创建用户.是否禁用",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.mobilePhone",
      isNameField: false,
      fieldLabel: "创建用户.手机号",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.email",
      isNameField: false,
      fieldLabel: "创建用户.邮箱",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.avatar",
      isNameField: false,
      fieldLabel: "创建用户.头像",
      isNullable: true,
      isCreatable: true,
      fieldType: "Picture",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.dingTalkUserId",
      isNameField: false,
      fieldLabel: "创建用户.钉钉用户ID",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.tatp",
      isNameField: false,
      fieldLabel: "创建用户.状态",
      isNullable: false,
      isCreatable: true,
      fieldType: "Decimal",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.aaaaaa",
      isNameField: false,
      fieldLabel: "创建用户.aaaaa",
      isNullable: false,
      isCreatable: true,
      fieldType: "Tag",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.xsxs",
      isNameField: false,
      fieldLabel: "创建用户.xs",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "createdBy.yonghuxingbie",
      isNameField: false,
      fieldLabel: "创建用户.用户性别",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: false,
      fieldName: "modifiedBy.createdOn",
      isNameField: false,
      fieldLabel: "修改用户.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "modifiedBy.modifiedOn",
      isNameField: false,
      fieldLabel: "修改用户.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.userName",
      isNameField: true,
      fieldLabel: "修改用户.用户名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.loginPwd",
      isNameField: false,
      fieldLabel: "修改用户.登录密码",
      isNullable: false,
      isCreatable: true,
      fieldType: "Password",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.loginName",
      isNameField: false,
      fieldLabel: "修改用户.登录账号名",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.jobTitle",
      isNameField: false,
      fieldLabel: "修改用户.职务",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.disabled",
      isNameField: false,
      fieldLabel: "修改用户.是否禁用",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.mobilePhone",
      isNameField: false,
      fieldLabel: "修改用户.手机号",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.email",
      isNameField: false,
      fieldLabel: "修改用户.邮箱",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.avatar",
      isNameField: false,
      fieldLabel: "修改用户.头像",
      isNullable: true,
      isCreatable: true,
      fieldType: "Picture",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.dingTalkUserId",
      isNameField: false,
      fieldLabel: "修改用户.钉钉用户ID",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.tatp",
      isNameField: false,
      fieldLabel: "修改用户.状态",
      isNullable: false,
      isCreatable: true,
      fieldType: "Decimal",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.aaaaaa",
      isNameField: false,
      fieldLabel: "修改用户.aaaaa",
      isNullable: false,
      isCreatable: true,
      fieldType: "Tag",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.xsxs",
      isNameField: false,
      fieldLabel: "修改用户.xs",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "modifiedBy.yonghuxingbie",
      isNameField: false,
      fieldLabel: "修改用户.用户性别",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: false,
      fieldName: "ownerUser.createdOn",
      isNameField: false,
      fieldLabel: "所属用户.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "ownerUser.modifiedOn",
      isNameField: false,
      fieldLabel: "所属用户.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.userName",
      isNameField: true,
      fieldLabel: "所属用户.用户名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.loginPwd",
      isNameField: false,
      fieldLabel: "所属用户.登录密码",
      isNullable: false,
      isCreatable: true,
      fieldType: "Password",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.loginName",
      isNameField: false,
      fieldLabel: "所属用户.登录账号名",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.jobTitle",
      isNameField: false,
      fieldLabel: "所属用户.职务",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.disabled",
      isNameField: false,
      fieldLabel: "所属用户.是否禁用",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.mobilePhone",
      isNameField: false,
      fieldLabel: "所属用户.手机号",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.email",
      isNameField: false,
      fieldLabel: "所属用户.邮箱",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.avatar",
      isNameField: false,
      fieldLabel: "所属用户.头像",
      isNullable: true,
      isCreatable: true,
      fieldType: "Picture",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.dingTalkUserId",
      isNameField: false,
      fieldLabel: "所属用户.钉钉用户ID",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.tatp",
      isNameField: false,
      fieldLabel: "所属用户.状态",
      isNullable: false,
      isCreatable: true,
      fieldType: "Decimal",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.aaaaaa",
      isNameField: false,
      fieldLabel: "所属用户.aaaaa",
      isNullable: false,
      isCreatable: true,
      fieldType: "Tag",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.xsxs",
      isNameField: false,
      fieldLabel: "所属用户.xs",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "ownerUser.yonghuxingbie",
      isNameField: false,
      fieldLabel: "所属用户.用户性别",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "ownerDepartment.departmentName",
      isNameField: true,
      fieldLabel: "所属部门.部门名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "ownerDepartment.description",
      isNameField: false,
      fieldLabel: "所属部门.部门说明",
      isNullable: true,
      isCreatable: true,
      fieldType: "TextArea",
    },
    {
      isUpdatable: true,
      fieldName: "ownerDepartment.dingDepartmentId",
      isNameField: false,
      fieldLabel: "所属部门.钉钉部门ID",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: false,
      fieldName: "approvalConfigId.entityCode",
      isNameField: false,
      fieldLabel: "审批流程.实体Code",
      isNullable: false,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: true,
      fieldName: "approvalConfigId.flowName",
      isNameField: true,
      fieldLabel: "审批流程.流程名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "approvalConfigId.isDisabled",
      isNameField: false,
      fieldLabel: "审批流程.是否禁用",
      isNullable: true,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: false,
      fieldName: "approvalConfigId.createdOn",
      isNameField: false,
      fieldLabel: "审批流程.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "approvalConfigId.modifiedOn",
      isNameField: false,
      fieldLabel: "审批流程.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "approvalConfigId.runningTotal",
      isNameField: false,
      fieldLabel: "审批流程.运行中的流程统计",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: false,
      fieldName: "approvalConfigId.completeTotal",
      isNameField: false,
      fieldLabel: "审批流程.结束的流程统计",
      isNullable: true,
      isCreatable: true,
      fieldType: "Integer",
    },
    {
      isUpdatable: false,
      fieldName: "lastApprovedBy.createdOn",
      isNameField: false,
      fieldLabel: "最近审批人.创建时间",
      isNullable: false,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: false,
      fieldName: "lastApprovedBy.modifiedOn",
      isNameField: false,
      fieldLabel: "最近审批人.最近修改时间",
      isNullable: true,
      isCreatable: false,
      fieldType: "DateTime",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.userName",
      isNameField: true,
      fieldLabel: "最近审批人.用户名称",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.loginPwd",
      isNameField: false,
      fieldLabel: "最近审批人.登录密码",
      isNullable: false,
      isCreatable: true,
      fieldType: "Password",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.loginName",
      isNameField: false,
      fieldLabel: "最近审批人.登录账号名",
      isNullable: false,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.jobTitle",
      isNameField: false,
      fieldLabel: "最近审批人.职务",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.disabled",
      isNameField: false,
      fieldLabel: "最近审批人.是否禁用",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.mobilePhone",
      isNameField: false,
      fieldLabel: "最近审批人.手机号",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.email",
      isNameField: false,
      fieldLabel: "最近审批人.邮箱",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.avatar",
      isNameField: false,
      fieldLabel: "最近审批人.头像",
      isNullable: true,
      isCreatable: true,
      fieldType: "Picture",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.dingTalkUserId",
      isNameField: false,
      fieldLabel: "最近审批人.钉钉用户ID",
      isNullable: true,
      isCreatable: true,
      fieldType: "Text",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.tatp",
      isNameField: false,
      fieldLabel: "最近审批人.状态",
      isNullable: false,
      isCreatable: true,
      fieldType: "Decimal",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.aaaaaa",
      isNameField: false,
      fieldLabel: "最近审批人.aaaaa",
      isNullable: false,
      isCreatable: true,
      fieldType: "Tag",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.xsxs",
      isNameField: false,
      fieldLabel: "最近审批人.xs",
      isNullable: false,
      isCreatable: true,
      fieldType: "Boolean",
    },
    {
      isUpdatable: true,
      fieldName: "lastApprovedBy.yonghuxingbie",
      isNameField: false,
      fieldLabel: "最近审批人.用户性别",
      isNullable: false,
      isCreatable: true,
      fieldType: "Option",
    },
  ];
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
