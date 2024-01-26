const { loadEntityToYao } = Require("sys.yao");

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

  loadEntityToYao(mainEntity);

  let queryParam = {
    select: fieldsList.split(","),
  };

  let data = Process(
    `models.${mainEntity}.Paginate`,
    queryParam,
    pageNo,
    pageSize
  );

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

function formCreateQuery(entity) {
  return {
    layoutJson:
      '{"widgetList":[{"key":40463,"type":"grid","alias":"column-2-grid","category":"container","icon":"column-2-grid","cols":[{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"input","alias":"","icon":"text-field","formItemFlag":true,"options":{"name":"departmentName","keyNameEnabled":false,"keyName":"","label":"部门名称","labelAlign":"","type":"text","defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"readonly":false,"disabled":false,"hidden":false,"clearable":true,"showPassword":false,"required":true,"requiredHint":"","validation":"","validationHint":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"prefixIcon":"","suffixIcon":"","appendButton":false,"appendButtonDisabled":false,"buttonIcon":"custom-search","onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onValidate":"","onAppendButtonClick":""},"nameReadonly":true,"id":"input99603"}],"options":{"name":"gridCol94789","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-94789"},{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"reference","alias":"","icon":"reference-field","formItemFlag":true,"options":{"name":"parentDepartmentId","keyNameEnabled":false,"keyName":"","label":"上级部门","labelAlign":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"disabled":false,"hidden":false,"required":true,"requiredHint":"","validation":"","validationHint":"","newTest":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"prefixIcon":"","suffixIcon":"","buttonIcon":"Search","onCreated":"","onMounted":"","onChange":"","onValidate":""},"nameReadonly":true,"id":"reference28286"}],"options":{"name":"gridCol20275","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":[]},"id":"grid-col-20275"}],"options":{"name":"grid91283","hidden":false,"gutter":12,"colHeight":null,"customClass":[]},"id":"grid91283"},{"key":52901,"type":"grid","alias":"column-2-grid","category":"container","icon":"column-2-grid","cols":[{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[{"type":"reference","alias":"","icon":"reference-field","formItemFlag":true,"options":{"name":"departmentOwnerUser","keyNameEnabled":false,"keyName":"","label":"部门负责人","labelAlign":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"disabled":false,"hidden":false,"required":false,"requiredHint":"","validation":"","validationHint":"","newTest":"","customClass":[],"labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"prefixIcon":"","suffixIcon":"","buttonIcon":"Search","onCreated":"","onMounted":"","onChange":"","onValidate":""},"nameReadonly":true,"id":"reference95876"}],"options":{"name":"gridCol79602","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-79602"},{"type":"grid-col","category":"container","icon":"grid-col","internal":true,"widgetList":[],"options":{"name":"gridCol73374","hidden":false,"span":12,"offset":0,"push":0,"pull":0,"responsive":false,"md":12,"sm":12,"xs":12,"customClass":""},"id":"grid-col-73374"}],"options":{"name":"grid72233","hidden":false,"gutter":12,"colHeight":null,"customClass":[]},"id":"grid72233"},{"type":"textarea","icon":"textarea-field","formItemFlag":true,"options":{"name":"description","keyNameEnabled":false,"keyName":"","label":"部门说明","labelAlign":"","rows":3,"autosize":false,"defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"labelWrap":false,"readonly":false,"disabled":false,"hidden":false,"required":false,"requiredHint":"","validation":"","validationHint":"","customClass":"","labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onValidate":""},"nameReadonly":true,"id":"textarea89661"}],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":[],"functions":"","layoutType":"PC","jsonVersion":3,"dataSources":[],"onFormCreated":"","onFormMounted":"","onFormDataChange":"","onFormValidate":""}}',
    fieldPropsMap: {},
    formData: {},
    labelData: {},
    deletedFields: [],
  };
}

function testEquation() {}

function refFieldQuery(
  entity,
  refField,
  pageNo,
  pageSize,
  queryText,
  extraFilter
) {}

function formCreateQuery(entity) {}

function formUpdateQuery(entity, id) {}

function saveRecord(entity, id, formModel) {
  loadEntityToYao(entity);
  if (!id) {
    id = Process(`models.${entity}.Create`, formModel);
  } else {
    Process(`models.${entity}.update`, id, formModel);
  }
  return id;
}
function deleteRecord({ recordIds, cascades }) {}
function initDataList(entity) {}
/**
 * 通用获取实体列表接口（实体+列表页面的实体列表）
 * @param {*} entityName 实体名称
 */
function getEntityCodeList(entityName) {}
/**
 * 通用查询详情接口
 * @param {*} entityId 实体ID
 * @param {*} fieldNames 需要获取的字段名称
 */
function queryById(entityId, fieldNames) {}

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
) {}

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
