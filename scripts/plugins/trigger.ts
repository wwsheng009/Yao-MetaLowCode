import { saveCurdRecord } from "@scripts/curd";
import { getEntityByCodeCache, getEntityByNameCache } from "@scripts/sys/lib";
import { Process } from "@yao/runtime";

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
  return dataAutoCreateEntityList(entityCode);
}
function dataAutoCreateEntityList(entityCode) {
  console.log(`dataAutoCreate no implement yet`);

  const entity = getEntityByCodeCache(entityCode, true);
  let fields = entity?.fieldSet.filter(
    (f) => f.type === "Reference" && f.reserved == false
  );

  return fields.reduce((list, f) => {
    let referTo = f.referTo.split(",")[0];
    const refEntity = getEntityByNameCache(referTo);

    if (refEntity.entityCode > 1000) {
      list.push({
        entityLabel: refEntity.label,
        entityCode: refEntity.entityCode,
        fieldName: f.name,
        isReferenced: false,
        entityName: refEntity.name,
        label: `${refEntity.label}(${f.label})`,
      });
    }

    return list;
  }, []);
  // return [
  //   {
  //     entityLabel: "销售订单",
  //     entityCode: 1013,
  //     fieldName: "xuanzexiaoshoudingdan",
  //     isReferenced: false,
  //     entityName: "Xiaoshoudingdan",
  //     label: "销售订单(选择销售订单)",
  //   },
  //   {
  //     entityLabel: "仓库管理",
  //     entityCode: 1006,
  //     fieldName: "chukucangku",
  //     isReferenced: false,
  //     entityName: "Cangkuguanli",
  //     label: "仓库管理(出库仓库)",
  //   },
  //   {
  //     entityLabel: "客户管理",
  //     entityCode: 1008,
  //     fieldName: "kehumingcheng",
  //     isReferenced: false,
  //     entityName: "Kehuguanli",
  //     label: "客户管理(客户名称)",
  //   },
  // ];
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
  saveCurdRecord("TriggerConfig", id, payload);
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
  return Process("scripts.curd.listQuery", payload);
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
