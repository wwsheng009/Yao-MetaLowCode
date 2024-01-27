const { loadEntityToYao } = Require("sys.yao");

const { getEntityByName, getEntityByCode } = Require("sys.lib");
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
  const entity = getEntityByName(mainEntity);
  loadEntityToYao(mainEntity);

  let queryParam = {
    select: fieldsList.split(","),
  };
  if (!queryParam.select.includes(entity.idFieldName)) {
    queryParam.select.push(entity.idFieldName);
  }
  console.log("queryParam data", queryParam);
  let data = Process(
    `models.${mainEntity}.Paginate`,
    queryParam,
    pageNo || 1,
    pageSize || 10
  );
  console.log("listQuery data", data);
  data.data &&
    data.data.forEach((line) => {
      line[entity.idFieldName] = `${entity.entityCode}-${
        line[entity.idFieldName]
      }`;
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

  const [formLayout] = Process("models.sys.form.layout.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });

  return {
    layoutJson: formLayout ? JSON.stringify(formLayout) : null,
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

function formUpdateQuery(entity, id) {}

function saveRecord(entityName, idstr, formModel) {
  // const entity = getEntityByName(entityName);
  loadEntityToYao(entityName);
  if (!idstr) {
    idstr = Process(`models.${entityName}.Create`, formModel);
  } else {
    const [entityCode, id] = idstr.split("-");
    Process(`models.${entityName}.update`, id, formModel);
  }
  return true;
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
 * @param {*} fieldNames 需要获取的字段名称
 */
function queryById(entityId, fieldNames) {
  const [entityCode, id] = entityId.split("-");
  const entity = getEntityByCode(entityCode);
  loadEntityToYao(entity.name);
  let query = {};
  if (fieldNames) {
    query.select = fieldNames.split(",");
  }
  console.log(`queryById:${id} ${typeof id}`);
  const data = Process(`models.${entity.name}.Find`, id, fieldNames);
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

  // 排除保留字段
  if (!queryReserved) {
    row.fieldSet = row.fieldSet.filter(
      (field) => !field.reserved || field.reserved !== true
    );
  }
  // 剔除所有引用字段
  if (!firstReference) {
    row.fieldSet = row.fieldSet.filter((field) => field.type !== "Reference");
  }
  let newFieldSet = row.fieldSet;
  if (queryReference) {
    row.fieldSet.forEach((field) => {
      if (field.type === "Reference") {
        const entityName = field.referTo.split(",")[0];
        const entity = getEntityFields(entityName);
        if (!entity.fieldSet) {
          throw new Error(`实体 ${entityName} 存在异常，没有字段列表`);
        }
        console.log("entity>>>>>>>>",entity)
        // 排除保留字段
        if (!queryReserved) {
          entity.fieldSet = entity.fieldSet.filter(
            (f1) => !f1.reserved || f1.reserved !== true
          );
        }
        // 剔除所有引用字段
        if (!firstReference) {
          entity.fieldSet = entity.fieldSet.filter(
            (f1) => f1.type !== "Reference"
          );
        }
        entity.fieldSet.forEach((f1) => {
          f1.name = `${field.name}.${f1.name}`;
          f1.label = `${field.label}.${f1.label}`;
        });
        newFieldSet = newFieldSet.concat(entity.fieldSet);

        // const refEntity = getEntityByName(field.referTo.split(",")[0]);
        // const refFields = queryEntityFields(refEntity.code, queryReference, queryReserved, firstReference);
        // field.referenceFields = refFields;
      }
    });
  }

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
