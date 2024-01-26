function getFlowDefinitionByConfigId() {}
function saveLastApprovalFlow(payload) {}
function getEntityApprovalConfigList(recordId) {}
function startApproval(entityId, approvalConfigId) {}
function getAllApprovalConfigEntity(data) {}

/**
 *
 * 审批流程专用
 * @param {*} mainEntity 实体名称
 * @param {*} fieldsList 要显示的字段名称
 * @param {*} pageSize 默认页数大小
 * @param {*} pageNo 页数大小
 * @param {*} filter { equation="AND", items:[{  "fieldName": "flowName", "op": "LK", "value": "修改"}] }  过滤
 * @param {*} advFilter { equation="AND", items:[{  "fieldName": "flowName", "op": "LK", "value": "修改"}] }  常用查询
 * @param {*} quickFilter ""  快速查询
 * @param {*} sortFields [{   "fieldName": "entityCode","type": "desc" }] 排序
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
}) {}
function getEntityApprovalTaskList(entity, type) {}
