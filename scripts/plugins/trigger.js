function queryChartData({
  chartType,
  entityName,
  latitude,
  longitude,
  noPrivileges,
  filter,
}) {}

function dataUpdateEntityList(entityCode) {
  console.log(`dataUpdateEntityList no implement yet`);
}
function dataAutoCreate(entityCode) {
  console.log(`dataAutoCreate no implement yet`);
}
function aggregationEntityList(entityCode) {
  console.log(`aggregationEntityList no implement yet`);
}
function execute(payload) {
  console.log(`execute no implement yet`);
}
function callBackTest(payload) {
  console.log(`callBackTest no implement yet`);
}
function querySendState() {
  console.log(`querySendState no implement yet`);
}
function idToIdName() {
  console.log(`idToIdName no implement yet`);
}
function getDataDeleteEntityList() {
  console.log(`getDataDeleteEntityList no implement yet`);
}

function getAssignEntityList() {
  console.log(`getAssignEntityList no implement yet`);
}
function getDataRevokeEntityList() {
  console.log(`getDataRevokeEntityList no implement yet`);
}

function aviatorValidate(payload) {
  console.log(`aviatorValidate no implement yet`);
  console.log(payload);
}

function getEntityCode(query) {}

function triggerSave(id, payload) {
  console.log(`triggerSave no implement yet ${id}`);
  console.log(payload);
}
function log(payload) {
  // payload = {
  //   mainEntity: "TriggerLog",
  //   fieldsList:
  //     "actionType,triggerReason,recordId,executeFlag,triggerConfigId,createdOn,errorLog",
  //   filter: {
  //     equation: "OR",
  //     items: [{ fieldName: "triggerReason", op: "LK", value: "" }],
  //   },
  //   pageSize: 20,
  //   pageNo: 1,
  //   sortFields: [{ fieldName: "createdOn", type: "DESC" }],
  // };
  return Process("scripts.curd.listQuery",payload)
  // return {
  //   dataList: [],
  //   pagination: {
  //     pageSize: 20,
  //     pageNo: 1,
  //     total: 0,
  //   },
  //   columnList: null,
  //   entityBasicInfo: null,
  //   statisticsList: null,
  // };
}
