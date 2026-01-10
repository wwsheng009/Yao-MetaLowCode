import { Process } from "@yao/runtime";

/**
 * get all the entitys
 *
 * yao run scripts.systemmanager.getEntitySet
 * @returns
 */
function getEntitySet() {
  return Process("models.sys.entity.get", {
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
    limit: 10000,
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
  // ];
}

function getFieldListOfFilter(entity) {
  return [
    {
      name: "kehumingcheng",
      label: "客户名称",
      type: "Text",
    },
    {
      name: "kehubianhao",
      label: "客户编号",
      type: "Text",
    },
    {
      name: "shoujihao",
      label: "手机号",
      type: "Text",
    },
    {
      name: "kehulaiyuan",
      label: "客户来源",
      type: "Text",
    },
    {
      name: "kehuzhuangtai",
      optionData: [
        {
          value: 1,
          label: "潜在客户",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "成交客户",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "无意向",
          displayOrder: 3,
        },
      ],
      label: "客户状态",
      type: "Option",
    },
    {
      name: "kehujibie",
      optionData: [
        {
          value: 1,
          label: "重要客户",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "一般客户",
          displayOrder: 2,
        },
      ],
      label: "客户级别",
      type: "Option",
    },
    {
      name: "suoshugonghai",
      optionData: [
        {
          value: 1,
          label: "上海公海池",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "北京公海池",
          displayOrder: 2,
        },
      ],
      label: "所属公海",
      type: "Option",
    },
    {
      name: "suoshuhangye",
      optionData: [
        {
          value: 1,
          label: "制造业",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "建筑业",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "金融业",
          displayOrder: 3,
        },
        {
          value: 4,
          label: "房地产业",
          displayOrder: 4,
        },
        {
          value: 5,
          label: "交通运输业",
          displayOrder: 5,
        },
      ],
      label: "所属行业",
      type: "Option",
    },
    {
      name: "kehuyouxiang",
      label: "客户邮箱",
      type: "Text",
    },
    {
      name: "kehudizhi",
      label: "客户地址",
      type: "AreaSelect",
    },
    {
      name: "xiangxidizhi",
      label: "详细地址",
      type: "TextArea",
    },
    {
      name: "kehuxiangqing",
      label: "客户详情",
      type: "TextArea",
    },
    {
      referTo: "CRMgonghaichi",
      name: "kehurenling",
      label: "客户认领",
      type: "Reference",
    },
    {
      name: "createdOn",
      label: "创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy",
      label: "创建用户",
      type: "Reference",
    },
    {
      name: "modifiedOn",
      label: "最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy",
      label: "修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "ownerUser",
      label: "所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerDepartment",
      label: "所属部门",
      type: "Reference",
    },
    {
      name: "kehurenling.createdOn",
      label: "客户认领.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "kehurenling.createdBy",
      label: "客户认领.创建用户",
      type: "Reference",
    },
    {
      name: "kehurenling.modifiedOn",
      label: "客户认领.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "kehurenling.modifiedBy",
      label: "客户认领.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "kehurenling.ownerUser",
      label: "客户认领.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "kehurenling.ownerDepartment",
      label: "客户认领.所属部门",
      type: "Reference",
    },
    {
      name: "kehurenling.kehumingcheng",
      label: "客户认领.客户名称",
      type: "Text",
    },
    {
      name: "kehurenling.kehubianhao",
      label: "客户认领.客户编号",
      type: "Text",
    },
    {
      name: "kehurenling.shoujihao",
      label: "客户认领.手机号",
      type: "Text",
    },
    {
      name: "kehurenling.kehulaiyuan",
      label: "客户认领.客户来源",
      type: "Text",
    },
    {
      name: "kehurenling.kehuzhuangtai",
      optionData: [
        {
          value: 1,
          label: "潜在客户",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "成交客户",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "无意向",
          displayOrder: 3,
        },
      ],
      label: "客户认领.客户状态",
      type: "Option",
    },
    {
      name: "kehurenling.kehujibie",
      optionData: [
        {
          value: 1,
          label: "重要客户",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "一般客户",
          displayOrder: 2,
        },
      ],
      label: "客户认领.客户级别",
      type: "Option",
    },
    {
      name: "kehurenling.suoshugonghai",
      optionData: [
        {
          value: 1,
          label: "上海公海池",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "北京公海池",
          displayOrder: 2,
        },
      ],
      label: "客户认领.所属公海",
      type: "Option",
    },
    {
      name: "kehurenling.suoshuhangye",
      optionData: [
        {
          value: 1,
          label: "制造业",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "建筑业",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "金融业",
          displayOrder: 3,
        },
        {
          value: 4,
          label: "房地产业",
          displayOrder: 4,
        },
        {
          value: 5,
          label: "交通运输业",
          displayOrder: 5,
        },
      ],
      label: "客户认领.所属行业",
      type: "Option",
    },
    {
      name: "kehurenling.kehuyouxiang",
      label: "客户认领.客户邮箱",
      type: "Text",
    },
    {
      name: "kehurenling.kehudizhi",
      label: "客户认领.客户地址",
      type: "AreaSelect",
    },
    {
      name: "kehurenling.xiangxidizhi",
      label: "客户认领.详细地址",
      type: "TextArea",
    },
    {
      name: "kehurenling.kehuxiangqing",
      label: "客户认领.客户详情",
      type: "TextArea",
    },
    {
      referTo: "User",
      name: "kehurenling.fuzeren",
      label: "客户认领.负责人",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "kehurenling.guishubumen",
      label: "客户认领.归属部门",
      type: "Reference",
    },
    {
      name: "createdBy.createdOn",
      label: "创建用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy.createdBy",
      label: "创建用户.创建用户",
      type: "Reference",
    },
    {
      name: "createdBy.modifiedOn",
      label: "创建用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy.modifiedBy",
      label: "创建用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "createdBy.ownerUser",
      label: "创建用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "createdBy.ownerDepartment",
      label: "创建用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "createdBy.departmentId",
      label: "创建用户.部门",
      type: "Reference",
    },
    {
      name: "createdBy.userName",
      label: "创建用户.用户名称",
      type: "Text",
    },
    {
      name: "createdBy.loginName",
      label: "创建用户.登录账号名",
      type: "Text",
    },
    {
      name: "createdBy.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
      ],
      label: "创建用户.职务",
      type: "Option",
    },
    {
      name: "createdBy.disabled",
      label: "创建用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "createdBy.mobilePhone",
      label: "创建用户.手机号",
      type: "Text",
    },
    {
      name: "createdBy.email",
      label: "创建用户.邮箱",
      type: "Text",
    },
    {
      name: "createdBy.tatp",
      label: "创建用户.状态",
      type: "Decimal",
    },
    {
      name: "createdBy.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "创建用户.aaaaa",
      type: "Tag",
    },
    {
      name: "createdBy.xsxs",
      label: "创建用户.xs",
      type: "Boolean",
    },
    {
      name: "modifiedBy.createdOn",
      label: "修改用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy.createdBy",
      label: "修改用户.创建用户",
      type: "Reference",
    },
    {
      name: "modifiedBy.modifiedOn",
      label: "修改用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy.modifiedBy",
      label: "修改用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "modifiedBy.ownerUser",
      label: "修改用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "modifiedBy.ownerDepartment",
      label: "修改用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "modifiedBy.departmentId",
      label: "修改用户.部门",
      type: "Reference",
    },
    {
      name: "modifiedBy.userName",
      label: "修改用户.用户名称",
      type: "Text",
    },
    {
      name: "modifiedBy.loginName",
      label: "修改用户.登录账号名",
      type: "Text",
    },
    {
      name: "modifiedBy.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
      ],
      label: "修改用户.职务",
      type: "Option",
    },
    {
      name: "modifiedBy.disabled",
      label: "修改用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "modifiedBy.mobilePhone",
      label: "修改用户.手机号",
      type: "Text",
    },
    {
      name: "modifiedBy.email",
      label: "修改用户.邮箱",
      type: "Text",
    },
    {
      name: "modifiedBy.tatp",
      label: "修改用户.状态",
      type: "Decimal",
    },
    {
      name: "modifiedBy.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "修改用户.aaaaa",
      type: "Tag",
    },
    {
      name: "modifiedBy.xsxs",
      label: "修改用户.xs",
      type: "Boolean",
    },
    {
      name: "ownerUser.createdOn",
      label: "所属用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "ownerUser.createdBy",
      label: "所属用户.创建用户",
      type: "Reference",
    },
    {
      name: "ownerUser.modifiedOn",
      label: "所属用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "ownerUser.modifiedBy",
      label: "所属用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "ownerUser.ownerUser",
      label: "所属用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerUser.ownerDepartment",
      label: "所属用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerUser.departmentId",
      label: "所属用户.部门",
      type: "Reference",
    },
    {
      name: "ownerUser.userName",
      label: "所属用户.用户名称",
      type: "Text",
    },
    {
      name: "ownerUser.loginName",
      label: "所属用户.登录账号名",
      type: "Text",
    },
    {
      name: "ownerUser.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
      ],
      label: "所属用户.职务",
      type: "Option",
    },
    {
      name: "ownerUser.disabled",
      label: "所属用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "ownerUser.mobilePhone",
      label: "所属用户.手机号",
      type: "Text",
    },
    {
      name: "ownerUser.email",
      label: "所属用户.邮箱",
      type: "Text",
    },
    {
      name: "ownerUser.tatp",
      label: "所属用户.状态",
      type: "Decimal",
    },
    {
      name: "ownerUser.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "所属用户.aaaaa",
      type: "Tag",
    },
    {
      name: "ownerUser.xsxs",
      label: "所属用户.xs",
      type: "Boolean",
    },
    {
      referTo: "Department",
      name: "ownerDepartment.parentDepartmentId",
      label: "所属部门.上级部门",
      type: "Reference",
    },
    {
      name: "ownerDepartment.departmentName",
      label: "所属部门.部门名称",
      type: "Text",
    },
    {
      name: "ownerDepartment.description",
      label: "所属部门.部门说明",
      type: "TextArea",
    },
    {
      referTo: "User",
      name: "ownerDepartment.departmentOwnerUser",
      label: "所属部门.部门负责人",
      type: "Reference",
    },
  ];
}

/**
 * 单选项管理,列表
 * @returns
 */
function getOptionFields() {
  return [
    {
      entityLabel: "用户",
      entityName: "User",
      fieldList: [
        {
          fieldName: "jobTitle",
          fieldLabel: "职务",
        },
      ],
    },
    {
      entityLabel: "跟进",
      entityName: "FollowUp",
      fieldList: [
        {
          fieldName: "wayType",
          fieldLabel: "跟进方式",
        },
      ],
    },
    {
      entityLabel: "产品信息",
      entityName: "Chanpinxinxi",
      fieldList: [
        {
          fieldName: "chanpinshuxing",
          fieldLabel: "产品属性",
        },
        {
          fieldName: "chanpinleixing",
          fieldLabel: "产品类型",
        },
        {
          fieldName: "danwei",
          fieldLabel: "单位",
        },
      ],
    },
    {
      entityLabel: "产品销售价格表",
      entityName: "Chanpinxiaoshoujiagebiao",
      fieldList: [
        {
          fieldName: "jiagedengji",
          fieldLabel: "价格等级",
        },
      ],
    },
    {
      entityLabel: "仓库管理",
      entityName: "Cangkuguanli",
      fieldList: [
        {
          fieldName: "cangkuxingzhi",
          fieldLabel: "仓库性质",
        },
      ],
    },
    {
      entityLabel: "仓位信息",
      entityName: "Cangweixinxi",
      fieldList: [
        {
          fieldName: "cangweizhuangtai",
          fieldLabel: "仓位状态",
        },
      ],
    },
    {
      entityLabel: "客户管理",
      entityName: "Kehuguanli",
      fieldList: [
        {
          fieldName: "kehufenlei",
          fieldLabel: "客户分类",
        },
        {
          fieldName: "kehulaiyuan",
          fieldLabel: "客户来源",
        },
        {
          fieldName: "jiagedengji",
          fieldLabel: "价格等级",
        },
        {
          fieldName: "jiesuanzhouqi",
          fieldLabel: "结算周期",
        },
        {
          fieldName: "shuizhong",
          fieldLabel: "税种",
        },
      ],
    },
    {
      entityLabel: "WMS产品信息",
      entityName: "WMSchanpinxinxi",
      fieldList: [
        {
          fieldName: "chanpinshuxing",
          fieldLabel: "产品属性",
        },
        {
          fieldName: "chanpinleixing",
          fieldLabel: "产品类型",
        },
        {
          fieldName: "danwei",
          fieldLabel: "单位",
        },
      ],
    },
    {
      entityLabel: "送货计划",
      entityName: "Songhuojihua",
      fieldList: [
        {
          fieldName: "songhuopici",
          fieldLabel: "送货批次",
        },
      ],
    },
    {
      entityLabel: "收款计划",
      entityName: "Shoukuanjihua",
      fieldList: [
        {
          fieldName: "shoukuanxiang",
          fieldLabel: "收款项",
        },
        {
          fieldName: "shoukuanfangshi",
          fieldLabel: "收款方式",
        },
      ],
    },
    {
      entityLabel: "WMS仓库信息",
      entityName: "WMScangkuxinxi",
      fieldList: [
        {
          fieldName: "cangkuxingzhi",
          fieldLabel: "仓库性质",
        },
        {
          fieldName: "cangkuzhuangtai",
          fieldLabel: "仓库状态",
        },
      ],
    },
    {
      entityLabel: "销售出库",
      entityName: "Xiaoshouchuku",
      fieldList: [
        {
          fieldName: "chanpinchukubiaoqian",
          fieldLabel: "产品出库标签",
        },
      ],
    },
    {
      entityLabel: "WMS仓位信息",
      entityName: "WMScangweixinxi",
      fieldList: [
        {
          fieldName: "cangweizhuangtai",
          fieldLabel: "仓位状态",
        },
      ],
    },
    {
      entityLabel: "WMS供应商信息",
      entityName: "WMSgongyingshangxinxi",
      fieldList: [
        {
          fieldName: "gongyingshangfenlei",
          fieldLabel: "供应商分类",
        },
        {
          fieldName: "gongyingshangdengji",
          fieldLabel: "供应商等级",
        },
        {
          fieldName: "jiesuanqixian",
          fieldLabel: "结算期限",
        },
        {
          fieldName: "shuizhong",
          fieldLabel: "税种",
        },
        {
          fieldName: "kaihuyinhang",
          fieldLabel: "开户银行",
        },
      ],
    },
    {
      entityLabel: "供应商管理",
      entityName: "Gongyingshangguanli",
      fieldList: [
        {
          fieldName: "gongyingshangfenlei",
          fieldLabel: "供应商分类",
        },
        {
          fieldName: "gongyingshangdengji",
          fieldLabel: "供应商等级",
        },
        {
          fieldName: "jiesuanqixian",
          fieldLabel: "结算期限",
        },
        {
          fieldName: "shuizhong",
          fieldLabel: "税种",
        },
      ],
    },
    {
      entityLabel: "采购申请",
      entityName: "Caigoushenqing",
      fieldList: [
        {
          fieldName: "xuqiulaiyuan",
          fieldLabel: "需求来源",
        },
      ],
    },
    {
      entityLabel: "到货计划",
      entityName: "Daohuojihua",
      fieldList: [
        {
          fieldName: "daohuopici",
          fieldLabel: "到货批次",
        },
      ],
    },
    {
      entityLabel: "付款计划",
      entityName: "Fukuanjihua",
      fieldList: [
        {
          fieldName: "fukuanxiang",
          fieldLabel: "付款项",
        },
        {
          fieldName: "fukuanfangshi",
          fieldLabel: "付款方式",
        },
      ],
    },
    {
      entityLabel: "采购入库",
      entityName: "Caigouruku",
      fieldList: [
        {
          fieldName: "shifoucunzaibuhegepin",
          fieldLabel: "是否存在不合格品",
        },
      ],
    },
    {
      entityLabel: "其他入库单",
      entityName: "Qitarukudan",
      fieldList: [
        {
          fieldName: "rukuleixing",
          fieldLabel: "入库类型",
        },
      ],
    },
    {
      entityLabel: "WMS采购申请",
      entityName: "WMScaigoushenqing",
      fieldList: [
        {
          fieldName: "xuqiulaiyuan",
          fieldLabel: "需求来源",
        },
      ],
    },
    {
      entityLabel: "WMS采购产品明细",
      entityName: "WMScaigouchanpinmingxi",
      fieldList: [
        {
          fieldName: "danwei",
          fieldLabel: "单位",
        },
      ],
    },
    {
      entityLabel: "其他出库单",
      entityName: "Qitachukudan",
      fieldList: [
        {
          fieldName: "rukuleixing",
          fieldLabel: "出库类型",
        },
      ],
    },
    {
      entityLabel: "库存调拨",
      entityName: "Kucuntiaobo",
      fieldList: [
        {
          fieldName: "tiaoboleixing",
          fieldLabel: "调拨类型",
        },
      ],
    },
    {
      entityLabel: "库存盘点",
      entityName: "Kucunpandian",
      fieldList: [
        {
          fieldName: "pandianleixing",
          fieldLabel: "盘点类型",
        },
      ],
    },
    {
      entityLabel: "WMS采购入库账单",
      entityName: "WMScaigourukuzhangdan",
      fieldList: [
        {
          fieldName: "yingfuzhuangtai",
          fieldLabel: "应付状态",
        },
        {
          fieldName: "kaipiaozhuangtai",
          fieldLabel: "开票状态",
        },
        {
          fieldName: "fukuanzhuangtai",
          fieldLabel: "付款状态",
        },
      ],
    },
    {
      entityLabel: "WMS账款对账",
      entityName: "WMSzhangkuanduizhang",
      fieldList: [
        {
          fieldName: "yujifukuanfangshi",
          fieldLabel: "预计付款方式",
        },
        {
          fieldName: "yingfuduizhangqueren",
          fieldLabel: "应付对账确认",
        },
      ],
    },
    {
      entityLabel: "WMS进项发票",
      entityName: "WMSjinxiangfapiao",
      fieldList: [
        {
          fieldName: "fapiaoleixing",
          fieldLabel: "发票类型",
        },
      ],
    },
    {
      entityLabel: "WMS付款单",
      entityName: "WMSfukuandan",
      fieldList: [
        {
          fieldName: "fukuanfangshi",
          fieldLabel: "付款方式",
        },
      ],
    },
    {
      entityLabel: "应收账款-对账",
      entityName: "Yingshouzhangkuanuizhang",
      fieldList: [
        {
          fieldName: "yujishoukuanfangshi",
          fieldLabel: "预计收款方式",
        },
      ],
    },
    {
      entityLabel: "WMS采购退货账单",
      entityName: "WMScaigoutuihuozhangdan",
      fieldList: [
        {
          fieldName: "yingfuzhuangtai",
          fieldLabel: "应付状态",
        },
        {
          fieldName: "kaipiaozhuangtai",
          fieldLabel: "开票状态",
        },
        {
          fieldName: "fukuanzhuangtai",
          fieldLabel: "付款状态",
        },
      ],
    },
    {
      entityLabel: "销项发票",
      entityName: "Xiaoxiangfapiao",
      fieldList: [
        {
          fieldName: "fapiaoleixing",
          fieldLabel: "发票类型",
        },
      ],
    },
    {
      entityLabel: "收款单",
      entityName: "Shoukuandan",
      fieldList: [
        {
          fieldName: "shoukuanfangshi",
          fieldLabel: "收款方式",
        },
      ],
    },
    {
      entityLabel: "应付账款-对账",
      entityName: "Yingfuzhangkuan",
      fieldList: [
        {
          fieldName: "yujifukuanfangshi",
          fieldLabel: "预计付款方式",
        },
      ],
    },
    {
      entityLabel: "进项发票",
      entityName: "Jinxiangfapiao",
      fieldList: [
        {
          fieldName: "fapiaoleixing",
          fieldLabel: "发票类型",
        },
      ],
    },
    {
      entityLabel: "付款单",
      entityName: "Fukuandan",
      fieldList: [
        {
          fieldName: "shoukuanfangshi",
          fieldLabel: "付款方式",
        },
      ],
    },
    {
      entityLabel: "WMS到货计划",
      entityName: "WMSdaohuojihua",
      fieldList: [
        {
          fieldName: "daohuopici",
          fieldLabel: "到货批次",
        },
      ],
    },
    {
      entityLabel: "WMS付款计划",
      entityName: "WMSfukuanjihua",
      fieldList: [
        {
          fieldName: "fukuanxiang",
          fieldLabel: "付款项",
        },
        {
          fieldName: "fukuanfangshi",
          fieldLabel: "付款方式",
        },
      ],
    },
    {
      entityLabel: "WMS供货商送货单",
      entityName: "WMSgonghuoshangsonghuodan",
      fieldList: [
        {
          fieldName: "songdaqueren",
          fieldLabel: "送达确认",
        },
      ],
    },
    {
      entityLabel: "WMS采购收货单",
      entityName: "WMScaigoushouhuodan",
      fieldList: [
        {
          fieldName: "shouhuoqueren",
          fieldLabel: "收货确认",
        },
      ],
    },
    {
      entityLabel: "WMS采购退货",
      entityName: "WMScaigoutuihuo",
      fieldList: [
        {
          fieldName: "tuihuoyuanyin",
          fieldLabel: "退货原因",
        },
        {
          fieldName: "chanpintuihuiqueren",
          fieldLabel: "产品退回确认",
        },
      ],
    },
    {
      entityLabel: "员工档案",
      entityName: "Yuangongdangan",
      fieldList: [
        {
          fieldName: "xingbie",
          fieldLabel: "性别",
        },
        {
          fieldName: "hujileixing",
          fieldLabel: "户籍类型",
        },
        {
          fieldName: "hunyinzhuangtai",
          fieldLabel: "婚姻状态",
        },
        {
          fieldName: "zhengzhimianmao",
          fieldLabel: "政治面貌",
        },
        {
          fieldName: "pinyongxingshi",
          fieldLabel: "聘用形式",
        },
        {
          fieldName: "yuangongzhuangtai",
          fieldLabel: "员工状态",
        },
        {
          fieldName: "zuigaoxueli",
          fieldLabel: "最高学历",
        },
      ],
    },
    {
      entityLabel: "WMS拣配备料单",
      entityName: "WMSjianpeibeiliaodan",
      fieldList: [
        {
          fieldName: "chanpinjianpeiqueren",
          fieldLabel: "产品拣配确认",
        },
      ],
    },
    {
      entityLabel: "人事证明开具",
      entityName: "Renshizhengmingkaiju",
      fieldList: [
        {
          fieldName: "shenqingzhengmingleixing",
          fieldLabel: "申请证明类型",
        },
      ],
    },
    {
      entityLabel: "WMS领料出库",
      entityName: "WMSlingliaochuku",
      fieldList: [
        {
          fieldName: "chanpinchukuqueren",
          fieldLabel: "产品出库确认",
        },
      ],
    },
    {
      entityLabel: "工作日历",
      entityName: "Gongzuorili",
      fieldList: [
        {
          fieldName: "gongzuozhuangtai",
          fieldLabel: "工作状态",
        },
      ],
    },
    {
      entityLabel: "WMS退料入库",
      entityName: "WMStuiliaoruku",
      fieldList: [
        {
          fieldName: "tuiliaoyuanyin",
          fieldLabel: "退料原因",
        },
      ],
    },
    {
      entityLabel: "招聘需求",
      entityName: "Zhaopinxuqiu",
      fieldList: [
        {
          fieldName: "xuqiuleixing",
          fieldLabel: "需求类型",
        },
        {
          fieldName: "xuqiuzhuangtai",
          fieldLabel: "需求状态",
        },
        {
          fieldName: "gangweixingzhi",
          fieldLabel: "岗位性质",
        },
        {
          fieldName: "renyuanlaiyuan",
          fieldLabel: "人员来源",
        },
        {
          fieldName: "xueliyaoqiu",
          fieldLabel: "学历要求",
        },
      ],
    },
    {
      entityLabel: "简历收集及初筛",
      entityName: "Jianlishoujijichushai",
      fieldList: [
        {
          fieldName: "xingbie",
          fieldLabel: "性别",
        },
        {
          fieldName: "zhengzhimianmao",
          fieldLabel: "政治面貌",
        },
        {
          fieldName: "zuigaoxueli",
          fieldLabel: "最高学历",
        },
        {
          fieldName: "hunyuqingkuang",
          fieldLabel: "婚育情况",
        },
      ],
    },
    {
      entityLabel: "简历-工作及实习经历",
      entityName: "Gongzuojishixijingli",
      fieldList: [
        {
          fieldName: "gongzuoxingzhi",
          fieldLabel: "工作性质",
        },
      ],
    },
    {
      entityLabel: "WMS其他入库单",
      entityName: "WMSqitarukudan",
      fieldList: [
        {
          fieldName: "rukuleixing",
          fieldLabel: "入库类型",
        },
      ],
    },
    {
      entityLabel: "WMS其他出库单",
      entityName: "WMSqitachukudan",
      fieldList: [
        {
          fieldName: "chukuleixing",
          fieldLabel: "出库类型",
        },
        {
          fieldName: "chukuqueren",
          fieldLabel: "出库确认",
        },
      ],
    },
    {
      entityLabel: "人才库",
      entityName: "Rencaiku",
      fieldList: [
        {
          fieldName: "xingbie",
          fieldLabel: "性别",
        },
        {
          fieldName: "zhengzhimianmao",
          fieldLabel: "政治面貌",
        },
        {
          fieldName: "zuigaoxueli",
          fieldLabel: "最高学历",
        },
        {
          fieldName: "hunyuqingkuang",
          fieldLabel: "婚育情况",
        },
        {
          fieldName: "yingpinleixing",
          fieldLabel: "应聘类型",
        },
        {
          fieldName: "jianlizhuangtai",
          fieldLabel: "简历状态",
        },
        {
          fieldName: "jianlilaiyuanqudao",
          fieldLabel: "简历来源渠道",
        },
      ],
    },
    {
      entityLabel: "人才库工作及实习经历",
      entityName: "Rencaikugongzuojishixijingli",
      fieldList: [
        {
          fieldName: "gongzuoxingzhi",
          fieldLabel: "工作性质",
        },
      ],
    },
    {
      entityLabel: "WMS库存调拨",
      entityName: "WMSkucuntiaobo",
      fieldList: [
        {
          fieldName: "tiaoboleixing",
          fieldLabel: "调拨类型",
        },
      ],
    },
    {
      entityLabel: "面试管理",
      entityName: "Mianshiguanli",
      fieldList: [
        {
          fieldName: "xuyaojicimianshi",
          fieldLabel: "需要几次面试",
        },
      ],
    },
    {
      entityLabel: "WMS库存盘点",
      entityName: "WMSkucunpandian",
      fieldList: [
        {
          fieldName: "pandianleixing",
          fieldLabel: "盘点类型",
        },
      ],
    },
    {
      entityLabel: "员工合同管理",
      entityName: "Yuangonghetongguanli",
      fieldList: [
        {
          fieldName: "hetongleixing",
          fieldLabel: "合同类型",
        },
        {
          fieldName: "hetongqixian",
          fieldLabel: "合同期限",
        },
        {
          fieldName: "hetongzhuti",
          fieldLabel: "合同主体",
        },
      ],
    },
    {
      entityLabel: "CRM市场活动记录",
      entityName: "CRMshichanghuodongjilu",
      fieldList: [
        {
          fieldName: "huodongleixing",
          fieldLabel: "活动类型",
        },
      ],
    },
    {
      entityLabel: "CRM线索池",
      entityName: "CRMxiansuochi",
      fieldList: [
        {
          fieldName: "xiansuochi",
          fieldLabel: "线索池",
        },
        {
          fieldName: "xiansuolaiyuan",
          fieldLabel: "线索来源",
        },
      ],
    },
    {
      entityLabel: "入职申请",
      entityName: "Ruzhishenqing",
      fieldList: [
        {
          fieldName: "yuangongleixing",
          fieldLabel: "员工类型",
        },
      ],
    },
    {
      entityLabel: "补卡申请",
      entityName: "Kaoqindaka",
      fieldList: [
        {
          fieldName: "buqianshijianduan",
          fieldLabel: "补签时间段",
        },
      ],
    },
    {
      entityLabel: "请假申请",
      entityName: "Qingjiashenqing",
      fieldList: [
        {
          fieldName: "qingjialeixing",
          fieldLabel: "请假类型",
        },
      ],
    },
    {
      entityLabel: "请假日期",
      entityName: "Qingjiariqi",
      fieldList: [
        {
          fieldName: "qingjiashiduan",
          fieldLabel: "请假时段",
        },
      ],
    },
    {
      entityLabel: "加班申请",
      entityName: "Jiabanshenqing",
      fieldList: [
        {
          fieldName: "qingjialeixing",
          fieldLabel: "加班类型",
        },
      ],
    },
    {
      entityLabel: "CRM线索",
      entityName: "CRMxiansuo",
      fieldList: [
        {
          fieldName: "xiansuochi",
          fieldLabel: "线索池",
        },
        {
          fieldName: "xiansuolaiyuan",
          fieldLabel: "线索来源",
        },
      ],
    },
    {
      entityLabel: "CRM公海池",
      entityName: "CRMkehu",
      fieldList: [
        {
          fieldName: "kehuzhuangtai",
          fieldLabel: "客户状态",
        },
        {
          fieldName: "kehujibie",
          fieldLabel: "客户级别",
        },
        {
          fieldName: "suoshugonghai",
          fieldLabel: "所属公海",
        },
        {
          fieldName: "suoshuhangye",
          fieldLabel: "所属行业",
        },
      ],
    },
    {
      entityLabel: "CRM客户",
      entityName: "CRMgonghaichi",
      fieldList: [
        {
          fieldName: "kehuzhuangtai",
          fieldLabel: "客户状态",
        },
        {
          fieldName: "kehujibie",
          fieldLabel: "客户级别",
        },
        {
          fieldName: "suoshugonghai",
          fieldLabel: "所属公海",
        },
        {
          fieldName: "suoshuhangye",
          fieldLabel: "所属行业",
        },
      ],
    },
    {
      entityLabel: "CRM商机",
      entityName: "CRMshangji",
      fieldList: [
        {
          fieldName: "xiaoshoujieduan",
          fieldLabel: "销售阶段",
        },
      ],
    },
    {
      entityLabel: "CRM产品明细",
      entityName: "CRMchanpinmingxi",
      fieldList: [
        {
          fieldName: "danwei",
          fieldLabel: "单位",
        },
        {
          fieldName: "shifoushangjia",
          fieldLabel: "是否上架",
        },
      ],
    },
    {
      entityLabel: "CRM应收计划",
      entityName: "CRMyingshoujihua",
      fieldList: [
        {
          fieldName: "jihuahuikuanfangshi",
          fieldLabel: "计划回款方式",
        },
      ],
    },
    {
      entityLabel: "CRM财务信息",
      entityName: "CRMcaiwuxinxi",
      fieldList: [
        {
          fieldName: "taitouleixing",
          fieldLabel: "抬头类型",
        },
        {
          fieldName: "kaihuyinhang",
          fieldLabel: "开户银行",
        },
      ],
    },
    {
      entityLabel: "工资计算",
      entityName: "Gongzijisuan",
      fieldList: [
        {
          fieldName: "gongzidanfafangzhuangtai",
          fieldLabel: "工资单发放状态",
        },
      ],
    },
    {
      entityLabel: "CRM回款单",
      entityName: "CRMhuikuandan",
      fieldList: [
        {
          fieldName: "huikuanfangshi",
          fieldLabel: "回款方式",
        },
        {
          fieldName: "huikuanzhuangtai",
          fieldLabel: "回款状态",
        },
        {
          fieldName: "kaipiaozhuangtai",
          fieldLabel: "开票状态",
        },
      ],
    },
    {
      entityLabel: "CRM开票申请",
      entityName: "CRMkaipiaoshenqing",
      fieldList: [
        {
          fieldName: "kaipiaoleixing",
          fieldLabel: "开票类型",
        },
        {
          fieldName: "kaipiaozhuangtai",
          fieldLabel: "开票状态",
        },
      ],
    },
    {
      entityLabel: "员工薪资结构",
      entityName: "Yuangongxinzijiegou",
      fieldList: [
        {
          fieldName: "zhuangtai",
          fieldLabel: "状态",
        },
      ],
    },
    {
      entityLabel: "专项附加扣除",
      entityName: "Zhuanxiangfujiakouchu",
      fieldList: [
        {
          fieldName: "zhuangtai",
          fieldLabel: "状态",
        },
      ],
    },
    {
      entityLabel: "CRM服务工单",
      entityName: "CRMfuwugongdan",
      fieldList: [
        {
          fieldName: "fuwuleixing",
          fieldLabel: "服务类型",
        },
      ],
    },
    {
      entityLabel: "ERP产品信息",
      entityName: "ERPchanpinxinxi",
      fieldList: [
        {
          fieldName: "chanpinshuxing",
          fieldLabel: "产品属性",
        },
        {
          fieldName: "chanpinleixing",
          fieldLabel: "产品类型",
        },
        {
          fieldName: "danwei",
          fieldLabel: "单位",
        },
        {
          fieldName: "huoqufangshi",
          fieldLabel: "获取方式",
        },
      ],
    },
    {
      entityLabel: "CRM换货申请",
      entityName: "CRMhuanhuoshenqing",
      fieldList: [
        {
          fieldName: "huanhuoyuanyin",
          fieldLabel: "换货原因",
        },
      ],
    },
    {
      entityLabel: "CRM退货申请",
      entityName: "CRMtuihuoshenqing",
      fieldList: [
        {
          fieldName: "huanhuoyuanyin",
          fieldLabel: "退货原因",
        },
      ],
    },
    {
      entityLabel: "ERP生产工单",
      entityName: "ERPshengchangongdan",
      fieldList: [
        {
          fieldName: "gongdanzhuangtai",
          fieldLabel: "工单状态",
        },
      ],
    },
    {
      entityLabel: "工时登记",
      entityName: "Gongshidengji",
      fieldList: [
        {
          fieldName: "gongshileibie",
          fieldLabel: "工时类别",
        },
      ],
    },
    {
      entityLabel: "费用登记",
      entityName: "Feiyongdengji",
      fieldList: [
        {
          fieldName: "feiyongleixing",
          fieldLabel: "费用类型",
        },
      ],
    },
    {
      entityLabel: "目标周期",
      entityName: "Mubiaozhouqi",
      fieldList: [
        {
          fieldName: "zhouqizhuangtai",
          fieldLabel: "周期状态",
        },
      ],
    },
    {
      entityLabel: "目标",
      entityName: "Mubiao",
      fieldList: [
        {
          fieldName: "mubiaoleixing",
          fieldLabel: "目标类型",
        },
      ],
    },
    {
      entityLabel: "发布公告",
      entityName: "Fabugonggao",
      fieldList: [
        {
          fieldName: "shifouxiajia",
          fieldLabel: "是否下架",
        },
      ],
    },
    {
      entityLabel: "目标关键结果",
      entityName: "Mubiaoguanjianjieguo",
      fieldList: [
        {
          fieldName: "jieguozhuangtai",
          fieldLabel: "结果状态",
        },
      ],
    },
    {
      entityLabel: "日程",
      entityName: "Richeng",
      fieldList: [
        {
          fieldName: "richengleixing",
          fieldLabel: "日程类型",
        },
      ],
    },
    {
      entityLabel: "日报",
      entityName: "Ribao",
      fieldList: [
        {
          fieldName: "shifouxuanzerenwu",
          fieldLabel: "是否选择任务",
        },
      ],
    },
    {
      entityLabel: "生产退料",
      entityName: "Shengchantuiliao",
      fieldList: [
        {
          fieldName: "tuiliaoyuanyin",
          fieldLabel: "退料原因",
        },
      ],
    },
    {
      entityLabel: "报销明细",
      entityName: "Baoxiaomingxi",
      fieldList: [
        {
          fieldName: "baoxiaoleixing",
          fieldLabel: "报销类型",
        },
      ],
    },
    {
      entityLabel: "项目任务管理请假申请",
      entityName: "Xiangmurenwuguanliqingjiash",
      fieldList: [
        {
          fieldName: "qingjialeixing",
          fieldLabel: "请假类型",
        },
      ],
    },
    {
      entityLabel: "请假详情",
      entityName: "Qingjiaxiangqing",
      fieldList: [
        {
          fieldName: "shiduan",
          fieldLabel: "时段",
        },
      ],
    },
    {
      entityLabel: "收款账户信息",
      entityName: "Shoukuanzhanghuxinxi",
      fieldList: [
        {
          fieldName: "zhanghuleixing",
          fieldLabel: "账户类型",
        },
      ],
    },
    {
      entityLabel: "付款账户信息",
      entityName: "Fukuanzhanghuxinxi",
      fieldList: [
        {
          fieldName: "zhanghuzhuangtai",
          fieldLabel: "账户状态",
        },
      ],
    },
    {
      entityLabel: "客户列表",
      entityName: "Kehuliebiao",
      fieldList: [
        {
          fieldName: "zhengjianleixing",
          fieldLabel: "证件类型",
        },
        {
          fieldName: "jiashizhengleixing",
          fieldLabel: "驾驶证类型",
        },
      ],
    },
    {
      entityLabel: "车辆保养",
      entityName: "Cheliangbaoyang",
      fieldList: [
        {
          fieldName: "baoyangzhuangtai",
          fieldLabel: "保养状态",
        },
      ],
    },
    {
      entityLabel: "TestUser",
      entityName: "TestUser",
      fieldList: [
        {
          fieldName: "userName",
          fieldLabel: "用户名称",
        },
      ],
    },
    {
      entityLabel: "商品表",
      entityName: "Shangpinbiao",
      fieldList: [
        {
          fieldName: "shangpinleixing",
          fieldLabel: "商品类型",
        },
      ],
    },
    {
      entityLabel: "人员信息",
      entityName: "Renyuanxinxi",
      fieldList: [
        {
          fieldName: "xingbie",
          fieldLabel: "性别",
        },
        {
          fieldName: "hujileixing",
          fieldLabel: "户籍类型",
        },
        {
          fieldName: "hunyinzhuangtai",
          fieldLabel: "婚姻状态",
        },
        {
          fieldName: "zhengzhimianmao",
          fieldLabel: "政治面貌",
        },
        {
          fieldName: "pinyongxingshi",
          fieldLabel: "聘用形式",
        },
        {
          fieldName: "yuangongzhuangtai",
          fieldLabel: "员工状态",
        },
        {
          fieldName: "zuigaoxueli",
          fieldLabel: "最高学历",
        },
      ],
    },
  ];
}

/**
 * 单选项管理
 * @param {string} entity
 * @param {string} field
 * @returns
 */
function getOptionItems(entity, field) {
  entity = "User";
  field = "jobTitle";
  return [
    {
      saved: true,
      label: "总监",
      value: 4,
    },
    {
      saved: true,
      label: "主管",
      value: 2,
    },
    {
      saved: true,
      label: "经理",
      value: 3,
    },
    {
      saved: true,
      label: "部长",
      value: 5,
    },
    {
      saved: true,
      label: "员工",
      value: 1,
    },
    {
      saved: true,
      label: "a",
      value: 6,
    },
  ];
}

function getFieldListOfFilter() {
  return [
    {
      name: "str1",
      label: "str1",
      type: "Text",
    },
    {
      referTo: "User",
      name: "b1",
      label: "b1",
      type: "Reference",
    },
    {
      name: "o1",
      optionData: [
        {
          value: 1,
          label: "a1",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "a2",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "a3",
          displayOrder: 3,
        },
      ],
      label: "o1",
      type: "Option",
    },
    {
      name: "tag1",
      optionData: [
        {
          value: "t1",
          displayOrder: 1,
        },
        {
          value: "t2",
          displayOrder: 2,
        },
      ],
      label: "tag1",
      type: "Tag",
    },
    {
      referTo: "User",
      name: "r1",
      label: "r1",
      type: "Reference",
    },
    {
      name: "createdOn",
      label: "创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy",
      label: "创建用户",
      type: "Reference",
    },
    {
      name: "modifiedOn",
      label: "最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy",
      label: "修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "ownerUser",
      label: "所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerDepartment",
      label: "所属部门",
      type: "Reference",
    },
    {
      name: "b1.createdOn",
      label: "b1.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "b1.createdBy",
      label: "b1.创建用户",
      type: "Reference",
    },
    {
      name: "b1.modifiedOn",
      label: "b1.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "b1.modifiedBy",
      label: "b1.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "b1.ownerUser",
      label: "b1.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "b1.ownerDepartment",
      label: "b1.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "b1.departmentId",
      label: "b1.部门",
      type: "Reference",
    },
    {
      name: "b1.userName",
      label: "b1.用户名称",
      type: "Text",
    },
    {
      name: "b1.loginName",
      label: "b1.登录账号名",
      type: "Text",
    },
    {
      name: "b1.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
        {
          value: 7,
          label: "测试",
          displayOrder: 7,
        },
      ],
      label: "b1.职务",
      type: "Option",
    },
    {
      name: "b1.disabled",
      label: "b1.是否禁用",
      type: "Boolean",
    },
    {
      name: "b1.mobilePhone",
      label: "b1.手机号",
      type: "Text",
    },
    {
      name: "b1.email",
      label: "b1.邮箱",
      type: "Text",
    },
    {
      name: "b1.tatp",
      label: "b1.状态",
      type: "Decimal",
    },
    {
      name: "b1.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "b1.aaaaa",
      type: "Tag",
    },
    {
      name: "b1.xsxs",
      label: "b1.xs",
      type: "Boolean",
    },
    {
      name: "b1.yonghuxingbie",
      optionData: [
        {
          value: 1,
          label: "男",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "女",
          displayOrder: 2,
        },
      ],
      label: "b1.用户性别",
      type: "Option",
    },
    {
      name: "r1.createdOn",
      label: "r1.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "r1.createdBy",
      label: "r1.创建用户",
      type: "Reference",
    },
    {
      name: "r1.modifiedOn",
      label: "r1.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "r1.modifiedBy",
      label: "r1.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "r1.ownerUser",
      label: "r1.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "r1.ownerDepartment",
      label: "r1.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "r1.departmentId",
      label: "r1.部门",
      type: "Reference",
    },
    {
      name: "r1.userName",
      label: "r1.用户名称",
      type: "Text",
    },
    {
      name: "r1.loginName",
      label: "r1.登录账号名",
      type: "Text",
    },
    {
      name: "r1.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
        {
          value: 7,
          label: "测试",
          displayOrder: 7,
        },
      ],
      label: "r1.职务",
      type: "Option",
    },
    {
      name: "r1.disabled",
      label: "r1.是否禁用",
      type: "Boolean",
    },
    {
      name: "r1.mobilePhone",
      label: "r1.手机号",
      type: "Text",
    },
    {
      name: "r1.email",
      label: "r1.邮箱",
      type: "Text",
    },
    {
      name: "r1.tatp",
      label: "r1.状态",
      type: "Decimal",
    },
    {
      name: "r1.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "r1.aaaaa",
      type: "Tag",
    },
    {
      name: "r1.xsxs",
      label: "r1.xs",
      type: "Boolean",
    },
    {
      name: "r1.yonghuxingbie",
      optionData: [
        {
          value: 1,
          label: "男",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "女",
          displayOrder: 2,
        },
      ],
      label: "r1.用户性别",
      type: "Option",
    },
    {
      name: "createdBy.createdOn",
      label: "创建用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy.createdBy",
      label: "创建用户.创建用户",
      type: "Reference",
    },
    {
      name: "createdBy.modifiedOn",
      label: "创建用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "createdBy.modifiedBy",
      label: "创建用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "createdBy.ownerUser",
      label: "创建用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "createdBy.ownerDepartment",
      label: "创建用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "createdBy.departmentId",
      label: "创建用户.部门",
      type: "Reference",
    },
    {
      name: "createdBy.userName",
      label: "创建用户.用户名称",
      type: "Text",
    },
    {
      name: "createdBy.loginName",
      label: "创建用户.登录账号名",
      type: "Text",
    },
    {
      name: "createdBy.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
        {
          value: 7,
          label: "测试",
          displayOrder: 7,
        },
      ],
      label: "创建用户.职务",
      type: "Option",
    },
    {
      name: "createdBy.disabled",
      label: "创建用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "createdBy.mobilePhone",
      label: "创建用户.手机号",
      type: "Text",
    },
    {
      name: "createdBy.email",
      label: "创建用户.邮箱",
      type: "Text",
    },
    {
      name: "createdBy.tatp",
      label: "创建用户.状态",
      type: "Decimal",
    },
    {
      name: "createdBy.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "创建用户.aaaaa",
      type: "Tag",
    },
    {
      name: "createdBy.xsxs",
      label: "创建用户.xs",
      type: "Boolean",
    },
    {
      name: "createdBy.yonghuxingbie",
      optionData: [
        {
          value: 1,
          label: "男",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "女",
          displayOrder: 2,
        },
      ],
      label: "创建用户.用户性别",
      type: "Option",
    },
    {
      name: "modifiedBy.createdOn",
      label: "修改用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy.createdBy",
      label: "修改用户.创建用户",
      type: "Reference",
    },
    {
      name: "modifiedBy.modifiedOn",
      label: "修改用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "modifiedBy.modifiedBy",
      label: "修改用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "modifiedBy.ownerUser",
      label: "修改用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "modifiedBy.ownerDepartment",
      label: "修改用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "modifiedBy.departmentId",
      label: "修改用户.部门",
      type: "Reference",
    },
    {
      name: "modifiedBy.userName",
      label: "修改用户.用户名称",
      type: "Text",
    },
    {
      name: "modifiedBy.loginName",
      label: "修改用户.登录账号名",
      type: "Text",
    },
    {
      name: "modifiedBy.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
        {
          value: 7,
          label: "测试",
          displayOrder: 7,
        },
      ],
      label: "修改用户.职务",
      type: "Option",
    },
    {
      name: "modifiedBy.disabled",
      label: "修改用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "modifiedBy.mobilePhone",
      label: "修改用户.手机号",
      type: "Text",
    },
    {
      name: "modifiedBy.email",
      label: "修改用户.邮箱",
      type: "Text",
    },
    {
      name: "modifiedBy.tatp",
      label: "修改用户.状态",
      type: "Decimal",
    },
    {
      name: "modifiedBy.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "修改用户.aaaaa",
      type: "Tag",
    },
    {
      name: "modifiedBy.xsxs",
      label: "修改用户.xs",
      type: "Boolean",
    },
    {
      name: "modifiedBy.yonghuxingbie",
      optionData: [
        {
          value: 1,
          label: "男",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "女",
          displayOrder: 2,
        },
      ],
      label: "修改用户.用户性别",
      type: "Option",
    },
    {
      name: "ownerUser.createdOn",
      label: "所属用户.创建时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "ownerUser.createdBy",
      label: "所属用户.创建用户",
      type: "Reference",
    },
    {
      name: "ownerUser.modifiedOn",
      label: "所属用户.最近修改时间",
      type: "DateTime",
    },
    {
      referTo: "User",
      name: "ownerUser.modifiedBy",
      label: "所属用户.修改用户",
      type: "Reference",
    },
    {
      referTo: "User",
      name: "ownerUser.ownerUser",
      label: "所属用户.所属用户",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerUser.ownerDepartment",
      label: "所属用户.所属部门",
      type: "Reference",
    },
    {
      referTo: "Department",
      name: "ownerUser.departmentId",
      label: "所属用户.部门",
      type: "Reference",
    },
    {
      name: "ownerUser.userName",
      label: "所属用户.用户名称",
      type: "Text",
    },
    {
      name: "ownerUser.loginName",
      label: "所属用户.登录账号名",
      type: "Text",
    },
    {
      name: "ownerUser.jobTitle",
      optionData: [
        {
          value: 4,
          label: "总监",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "主管",
          displayOrder: 2,
        },
        {
          value: 3,
          label: "经理",
          displayOrder: 3,
        },
        {
          value: 5,
          label: "部长",
          displayOrder: 4,
        },
        {
          value: 1,
          label: "员工",
          displayOrder: 5,
        },
        {
          value: 6,
          label: "a",
          displayOrder: 6,
        },
        {
          value: 7,
          label: "测试",
          displayOrder: 7,
        },
      ],
      label: "所属用户.职务",
      type: "Option",
    },
    {
      name: "ownerUser.disabled",
      label: "所属用户.是否禁用",
      type: "Boolean",
    },
    {
      name: "ownerUser.mobilePhone",
      label: "所属用户.手机号",
      type: "Text",
    },
    {
      name: "ownerUser.email",
      label: "所属用户.邮箱",
      type: "Text",
    },
    {
      name: "ownerUser.tatp",
      label: "所属用户.状态",
      type: "Decimal",
    },
    {
      name: "ownerUser.aaaaaa",
      optionData: [
        {
          value: "11",
          displayOrder: 1,
        },
        {
          value: "222",
          displayOrder: 2,
        },
        {
          value: "33",
          displayOrder: 3,
        },
        {
          value: "111",
          displayOrder: 4,
        },
      ],
      label: "所属用户.aaaaa",
      type: "Tag",
    },
    {
      name: "ownerUser.xsxs",
      label: "所属用户.xs",
      type: "Boolean",
    },
    {
      name: "ownerUser.yonghuxingbie",
      optionData: [
        {
          value: 1,
          label: "男",
          displayOrder: 1,
        },
        {
          value: 2,
          label: "女",
          displayOrder: 2,
        },
      ],
      label: "所属用户.用户性别",
      type: "Option",
    },
    {
      referTo: "Department",
      name: "ownerDepartment.parentDepartmentId",
      label: "所属部门.上级部门",
      type: "Reference",
    },
    {
      name: "ownerDepartment.departmentName",
      label: "所属部门.部门名称",
      type: "Text",
    },
    {
      name: "ownerDepartment.description",
      label: "所属部门.部门说明",
      type: "TextArea",
    },
    {
      referTo: "User",
      name: "ownerDepartment.departmentOwnerUser",
      label: "所属部门.部门负责人",
      type: "Reference",
    },
  ];
}
