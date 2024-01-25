function info() {
  return {
    version: "1.3.0",
    dbVersion: null,
    trialVersionFlag: false, //演示版本
    appName: "数字化开发平台",
    homeURL: "http://localhost",
    pageFooter: "上海极昇数科数字科技有限公司提供技术支持",
    logo: "/src/assets/imgs/logo.png",
    logoWhite: "",
    themeColor: "#246EBC",
    watermark: false,
    appTitle: "美乐低代码—数字化开发平台",
    appSubtitle: "登录用户/密码：admin/admin (每周日重置数据)",
    appIntro:
      "快速搭建企业管理系统：CRM客户管理、OA办公自动化、进销存、工作流、项目管理，无需编程基础，1~3天即可交付上线。 ",
    smsSetting: {
      openStatus: false,
      appId: null,
      appKey: null,
      signature: null,
    },
    emailSetting: {
      openStatus: false,
      appId: null,
      appKey: null,
      from: null,
      fromName: null,
      cc: null,
    },
    cloudStorageSetting: {
      openStatus: false,
      accessKey: null,
      secretKey: null,
      bucket: null,
      host: null,
    },
    dingTalkSetting: {
      openStatus: false,
      dingTalkAppKey: null,
      dingTalkAppSecret: null,
      dingTalkAgentId: null,
      nodeRole: null,
    },
    account: "10210",
    secretKey: "DKIi1AYl1SLWXfwbg8aimAiVlOU7F1S0YFXtrahp",
    licenseCode: "88bd3647b67146ba8a19f9196648b6b5",
    offlineSign: null,
    licenseInfo: {
      serialNumber: "88bd3647b67146ba8a19f9196648b6b5",
      account: "10210",
      productType: "企业版",
      licenseDetail:
        "*****************************************************\n授权码：88bd3647b67146ba8a19f9196648b6b5\n上海极昇数科数据技术有限公司\n账号：10210\n设备号：DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k\n版本：企业版\n用户定义实体上限：999999\n*****************************************************",
      entityLimit: 999999,
      deviceNo: "DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k",
      companyName: "上海极昇数科数据技术有限公司",
    },
    todoTaskCorn: "0 0 10 * * ?",
    autoBackup: false,
    backupOverdueDay: "30",
    backupCycle: "1",
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
    sms: '{"openStatus":false,"appId":null,"appKey":null,"signature":null}',
    email:
      '{"openStatus":false,"appId":null,"appKey":null,"from":null,"fromName":null,"cc":null}',
    cloudStorage:
      '{"openStatus":false,"accessKey":null,"secretKey":null,"bucket":null,"host":null}',
    dingTalk:
      '{"openStatus":false,"dingTalkAppKey":null,"dingTalkAppSecret":null,"dingTalkAgentId":null,"nodeRole":null}',
    sqlVersion: "1.1.15",
  };
}
function queryPublicSetting() {
  return {
    pluginIdList: ["mannerReport", "metaTrigger", "metaDataCube"],
    watermark: false,
    appName: "数字化开发平台",
    appIntro:
      "快速搭建企业管理系统：CRM客户管理、OA办公自动化、进销存、工作流、项目管理，无需编程基础，1~3天即可交付上线。 ",
    pageFooter: "上海极昇数科数字科技有限公司提供技术支持",
    appTitle: "美乐低代码—数字化开发平台",
    version: "1.3.0",
    themeColor: "#246EBC",
    logo: "/src/assets/imgs/logo.png",
    logoWhite: "",
    appSubtitle: "登录用户/密码：admin/admin (每周日重置数据)",
    trialVersionFlag: false, //演示版本
    productType: {
      displayName: "企业版",
      value: 4,
    },
  };
}
/**
 * 更新系统配置
 * @param {object} payload
 */
function updateSysSetting(payload) {
  payload = {
    accessKey: null,
    account: "10210",
    appId: null,
    appIntro:
      "快速搭建企业管理系统：CRM客户管理、OA办公自动化、进销存、工作流、项目管理，无需编程基础，1~3天即可交付上线。 ",
    appKey: null,
    appName: "数字化开发平台111",
    appSubtitle: "登录用户/密码：admin/admin (每周日重置数据)",
    appTitle: "美乐低代码—数字化开发平台",
    autoBackup: false,
    backupCycle: 1,
    backupOverdueDay: 30,
    bucket: null,
    cc: null,
    cloudStorage:
      '{"openStatus":false,"accessKey":null,"secretKey":null,"bucket":null,"host":null}',
    cloudStorageOpen: false,
    cloudStorageSetting: {
      accessKey: null,
      bucket: null,
      host: null,
      openStatus: false,
      secretKey: null,
    },
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
    dbVersion: null,
    dingTalk:
      '{"openStatus":false,"dingTalkAppKey":null,"dingTalkAppSecret":null,"dingTalkAgentId":null,"nodeRole":null}',
    dingTalkAgentId: null,
    dingTalkAppKey: null,
    dingTalkAppSecret: null,
    dingTalkOpen: false,
    dingTalkSetting: {
      dingTalkAgentId: null,
      dingTalkAppKey: null,
      dingTalkAppSecret: null,
      nodeRole: null,
      openStatus: false,
    },
    email:
      '{"openStatus":false,"appId":null,"appKey":null,"from":null,"fromName":null,"cc":null}',
    emailOpen: false,
    emailSetting: {
      appId: null,
      appKey: null,
      cc: null,
      from: null,
      fromName: null,
      openStatus: false,
    },
    from: null,
    fromName: null,
    homeDir: "http://localhost/dingTalk/userLogin",
    homeURL: "http://localhost",
    host: null,
    licenseCode: "88bd3647b67146ba8a19f9196648b6b5",
    licenseInfo: {
      account: "10210",
      companyName: "上海极昇数科数据技术有限公司",
      deviceNo: "DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k",
      entityLimit: 999999,
      licenseDetail:
        "*****************************************************\n授权码：88bd3647b67146ba8a19f9196648b6b5\n上海极昇数科数据技术有 限公司\n账号：10210\n设备号：DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k\n版本：企业版\n用户定义实体上限：999999\n*****************************************************",
      productType: "企业版",
      serialNumber: "88bd3647b67146ba8a19f9196648b6b5",
    },
    logo: "/src/assets/imgs/logo.png",
    logoWhite: "",
    nodeRole: [],
    offlineSign: null,
    openStatus: false,
    pageFooter: "上海极昇数科数字科技有限公司提供技术支持",
    secretKey: null,
    sms: '{"openStatus":false,"appId":null,"appKey":null,"signature":null}',
    smsOpen: false,
    smsSetting: {
      appId: null,
      appKey: null,
      openStatus: false,
      signature: null,
    },
    smsappId: null,
    smsappKey: null,
    smsopenStatus: false,
    smssignature: null,
    sqlVersion: "1.1.15",
    themeColor: "#246EBC",
    todoTaskCorn: "0 0 10 * * ?",
    trialVersionFlag: false,
    version: "1.3.0",
    watermark: false,
    webVer: "1.3.6 20240124(1.3.0)",
  };
}

function registerLicense(payload) {}
