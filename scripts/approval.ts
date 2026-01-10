import { Process } from "@yao/runtime";
import { getEntityByCodeCache, getEntityByNameCache, getUUID } from "./sys/lib";

function getFlowDefinitionByConfigId(approvalConfigId) {
  const [config] = Process("models.ApprovalConfig.get", {
    select: ["flowName", "approvalConfigId", "approvalFlowId"],
    wheres: [
      {
        column: "approvalConfigId",
        value: approvalConfigId,
      },
    ],
    limit: 1,
  });
  if (config?.approvalFlowId) {
    const [{ flowDefinition }] = Process("models.ApprovalFlow.get", {
      select: ["flowDefinition"],
      wheres: [
        {
          column: "approvalConfigId",
          value: approvalConfigId,
        },
        {
          column: "approvalFlowId",
          value: config.approvalFlowId,
        },
      ],
      limit: 1,
    });
    if (flowDefinition) {
      config.nodeConfig = JSON.parse(flowDefinition);
    }
  }

  return config;
}
function saveLastApprovalFlow(payload) {
  // payload = {
  //   approvalConfigId: "0000030-8dfe52d43046437a804797dcd4eac233",
  //   flowName: "a1",
  //   nodeConfig: {
  //     nodeName: "发起人",
  //     type: 0,
  //     nodeRoleType: 2,
  //     nodeRoleList: [],
  //     filter: { equation: "", items: [] },
  //     childNode: {
  //       nodeName: "审批人",
  //       type: 1,
  //       nodeRoleType: 2,
  //       nodeRoleList: [],
  //       userSelectFlag: true,
  //       transferApproval: true,
  //       addSignaturesApproval: true,
  //       multiPersonApproval: 1,
  //       modifiableFields: [],
  //       childNode: {
  //         nodeName: "审批人",
  //         type: 1,
  //         nodeRoleType: 2,
  //         nodeRoleList: [],
  //         userSelectFlag: true,
  //         transferApproval: true,
  //         addSignaturesApproval: true,
  //         multiPersonApproval: 1,
  //         modifiableFields: [
  //           {
  //             nameFieldFlag: false,
  //             physicalName: "c_jine",
  //             reserved: false,
  //             referTo: null,
  //             name: "jine",
  //             updatable: true,
  //             idFieldFlag: false,
  //             label: "金额",
  //             creatable: true,
  //             type: "Money",
  //             mainDetailFieldFlag: false,
  //             isSelected: true,
  //             isEdit: true,
  //             isRequired: false,
  //           },
  //         ],
  //         childNode: {
  //           nodeName: "抄送人",
  //           type: 2,
  //           userSelectFlag: true,
  //           automaticSharing: false,
  //           nodeUserList: [],
  //           externalUserList: [
  //             {
  //               name: "管理员角色",
  //               id: "0000023-00000000000000000000000000000001",
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   },
  // };
  // console.log("payload.nodeConfig",payload.nodeConfig)
  // 这里还需要判断表是否存在与流程相关的字段，如果不存在，需要在表里创建对应的字段。
  //
  // approvalConfigId/approvalStatus/lastApprovedBy/lastApprovedOn/lastApprovalRemark/
  const [config] = Process("models.ApprovalConfig.get", {
    wheres: [
      {
        column: "approvalConfigId",
        value: payload.approvalConfigId,
      },
    ],
    limit: 1,
  });
  if (config?.entityCode) {
    const entity = getEntityByCodeCache(config.entityCode);
    const field = entity?.fieldSet.find((f) => f.name === "approvalStatus");
    if (!field) {
      [
        {
          entityCode:entity.entityCode,
          nameFieldFlag: false,
          physicalName: "approvalConfigId",
          reserved: true,
          referTo: "ApprovalConfig,",
          name: "approvalConfigId",
          updatable: false,
          idFieldFlag: false,
          label: "审批流程",
          creatable: false,
          type: "Reference",
          mainDetailFieldFlag: false,
        },
        {
          entityCode:entity.entityCode,
          nameFieldFlag: false,
          physicalName: "approvalStatus",
          reserved: true,
          referTo: null,
          name: "approvalStatus",
          updatable: false,
          idFieldFlag: false,
          label: "审批状态",
          creatable: false,
          type: "Status",
          mainDetailFieldFlag: false,
        },
        {
          entityCode:entity.entityCode,
          nameFieldFlag: false,
          physicalName: "lastApprovedBy",
          reserved: true,
          referTo: "User,",
          name: "lastApprovedBy",
          updatable: false,
          idFieldFlag: false,
          label: "最近审批人",
          creatable: false,
          type: "Reference",
          mainDetailFieldFlag: false,
        },
        {
          entityCode:entity.entityCode,
          nameFieldFlag: false,
          physicalName: "lastApprovedOn",
          reserved: true,
          referTo: null,
          name: "lastApprovedOn",
          updatable: false,
          idFieldFlag: false,
          label: "最近审批时间",
          creatable: false,
          type: "DateTime",
          mainDetailFieldFlag: false,
        },
        {
          entityCode:entity.entityCode,
          nameFieldFlag: false,
          physicalName: "lastApprovalRemark",
          reserved: true,
          referTo: null,
          name: "lastApprovalRemark",
          updatable: false,
          idFieldFlag: false,
          label: "最近审批批注",
          creatable: false,
          type: "TextArea",
          mainDetailFieldFlag: false,
        },
      ].forEach((f) => {
        Process("scripts.systemmanager.addField", f,entity.name, true);
      });
    }
  }

  const entity = getEntityByNameCache("ApprovalFlow");
  let flowId = payload.approvalFlowId;
  if (!flowId) {
    flowId = getUUID(entity.entityCode);
    Process("models.ApprovalFlow.save", {
      approvalConfigId: payload.approvalConfigId,
      approvalFlowId: flowId,
      flowDefinition: JSON.stringify(payload.nodeConfig),
    });
  } else {
    Process(
      "models.ApprovalFlow.updatewhere",
      {
        wheres: [
          {
            column: "approvalConfigId",
            value: payload.approvalConfigId,
          },
          {
            column: "approvalFlowId",
            value: flowId,
          },
        ],
      },
      {
        approvalConfigId: payload.approvalConfigId,
        approvalFlowId: flowId,
        flowDefinition: JSON.stringify(payload.nodeConfig),
      }
    );
  }

  Process(
    "models.ApprovalConfig.UpdateWhere",
    {
      wheres: [
        {
          column: "approvalConfigId",
          value: payload.approvalConfigId,
        },
      ],
    },
    {
      approvalFlowId: flowId,
    }
  );
}
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
function listQuery(payload) {
  return Process("scripts.curd.listQuery", payload);

}
function getEntityApprovalTaskList(entity, type) {}

function configList(payload) {
  // payload = {
  //   mainEntity: "ApprovalConfig",
  //   fieldsList:
  //     "entityCode,flowName,modifiedOn,isDisabled,runningTotal,completeTotal,createdOn",
  //   filter: {
  //     equation: "AND",
  //     items: [{ fieldName: "flowName", op: "LK", value: "" }],
  //   },
  //   pageSize: 20,
  //   pageNo: 1,
  //   sortFields: [{ fieldName: "createdOn", type: "DESC" }],
  // };
  return Process("scripts.curd.listQuery", payload);
}


function getHisActivityIns(entityId){

  return {}
}

function recordApprovalState(recordId){
  return {}
}

function createApprovalSystemFields(entityName){
  return {}
}