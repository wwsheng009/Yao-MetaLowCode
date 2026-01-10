import { Process } from "@yao/runtime";
import { getCurrentTime } from "@scripts/sys/lib";

function info() {
  const defaultSetting = {
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

  const settings = Process("models.SystemSetting.get", {
    select: ["settingName", "settingValue", "defaultValue"],
    limit: 1000,
  });


  const map = {};
  for (const item of settings) {
    let settingName = item.settingName;
    if (
      ["sms", "cloudStorage", "dingTalk", "email"].includes(item.settingName)
    ) {
      settingName = item.settingName + "Setting";
    }
    // 检查是否需要输出。
    if (!defaultSetting[settingName] && !defaultSetting[item.settingName]) {
      continue;
    }
    let value = item.settingValue ? item.settingValue : item.defaultValue;

    map[item.settingName] = value;
    if (
      ["sms", "cloudStorage", "dingTalk", "email"].includes(item.settingName)
    ) {
      map[item.settingName + "Setting"] = JSON.parse(value);
    }
  }

  return {
    ...defaultSetting,
    ...map,
  };
}
function queryPublicSetting() {
  const defaultSetting = {
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
  const settings = Process("models.SystemSetting.get", {
    select: ["settingName", "settingValue", "defaultValue"],
    limit: 1000,
  });

  const map = {};
  for (const item of settings) {
    let settingName = item.settingName;
    if (
      ["sms", "cloudStorage", "dingTalk", "email"].includes(item.settingName)
    ) {
      settingName = item.settingName + "Setting";
    }
    // 检查是否需要输出。
    if (!defaultSetting[settingName] && !defaultSetting[item.settingName]) {
      continue;
    }
    let value = item.settingValue ? item.settingValue : item.defaultValue;

    map[item.settingName] = value;
    if (
      ["sms", "cloudStorage", "dingTalk", "email"].includes(item.settingName)
    ) {
      map[item.settingName + "Setting"] = JSON.parse(value);
    }
  }

  return {
    ...defaultSetting,
    ...map,
  };
}
/**
 * 更新系统配置
 * @param {object} payload
 */
function updateSysSetting(setting) {
  console.log("updateSysSetting", setting);

  // return;
  // setting = {
  //   accessKey: null,
  //   account: "10210",
  //   appId: null,
  //   appIntro:
  //     "快速搭建企业管理系统：CRM客户管理、OA办公自动化、进销存、工作流、项目管理，无需编程基础，1~3天即可交付上线。 ",
  //   appKey: null,
  //   appName: "数字化开发平台111",
  //   appSubtitle: "登录用户/密码：admin/admin (每周日重置数据)",
  //   appTitle: "美乐低代码—数字化开发平台",
  //   autoBackup: false,
  //   backupCycle: 1,
  //   backupOverdueDay: 30,
  //   bucket: null,
  //   cc: null,
  //   cloudStorage:
  //     '{"openStatus":false,"accessKey":null,"secretKey":null,"bucket":null,"host":null}',
  //   cloudStorageOpen: false,
  //   cloudStorageSetting: {
  //     accessKey: null,
  //     bucket: null,
  //     host: null,
  //     openStatus: false,
  //     secretKey: null,
  //   },
  //   dateFormat: "yyyy-MM-dd",
  //   dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
  //   dbVersion: null,
  //   dingTalk:
  //     '{"openStatus":false,"dingTalkAppKey":null,"dingTalkAppSecret":null,"dingTalkAgentId":null,"nodeRole":null}',
  //   dingTalkAgentId: null,
  //   dingTalkAppKey: null,
  //   dingTalkAppSecret: null,
  //   dingTalkOpen: false,
  //   dingTalkSetting: {
  //     dingTalkAgentId: null,
  //     dingTalkAppKey: null,
  //     dingTalkAppSecret: null,
  //     nodeRole: null,
  //     openStatus: false,
  //   },
  //   email:
  //     '{"openStatus":false,"appId":null,"appKey":null,"from":null,"fromName":null,"cc":null}',
  //   emailOpen: false,
  //   emailSetting: {
  //     appId: null,
  //     appKey: null,
  //     cc: null,
  //     from: null,
  //     fromName: null,
  //     openStatus: false,
  //   },
  //   from: null,
  //   fromName: null,
  //   homeDir: "http://localhost/dingTalk/userLogin",
  //   homeURL: "http://localhost",
  //   host: null,
  //   licenseCode: "88bd3647b67146ba8a19f9196648b6b5",
  //   licenseInfo: {
  //     account: "10210",
  //     companyName: "上海极昇数科数据技术有限公司",
  //     deviceNo: "DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k",
  //     entityLimit: 999999,
  //     licenseDetail:
  //       "*****************************************************\n授权码：88bd3647b67146ba8a19f9196648b6b5\n上海极昇数科数据技术有 限公司\n账号：10210\n设备号：DN_AvfXmL7k28ULOM3aXiCQQcqdRkWp6ZyLF6k\n版本：企业版\n用户定义实体上限：999999\n*****************************************************",
  //     productType: "企业版",
  //     serialNumber: "88bd3647b67146ba8a19f9196648b6b5",
  //   },
  //   logo: "/src/assets/imgs/logo.png",
  //   logoWhite: "",
  //   nodeRole: [],
  //   offlineSign: null,
  //   openStatus: false,
  //   pageFooter: "上海极昇数科数字科技有限公司提供技术支持",
  //   secretKey: null,
  //   sms: '{"openStatus":false,"appId":null,"appKey":null,"signature":null}',
  //   smsOpen: false,
  //   smsSetting: {
  //     appId: null,
  //     appKey: null,
  //     openStatus: false,
  //     signature: null,
  //   },
  //   smsappId: null,
  //   smsappKey: null,
  //   smsopenStatus: false,
  //   smssignature: null,
  //   sqlVersion: "1.1.15",
  //   themeColor: "#246EBC",
  //   todoTaskCorn: "0 0 10 * * ?",
  //   trialVersionFlag: false,
  //   version: "1.3.0",
  //   watermark: false,
  //   webVer: "1.3.6 20240124(1.3.0)",
  // };

  const newSetting = {
    // 登录页面配置
    appIntro: setting.appIntro, //简介
    appName: setting.appName, //名称
    appSubtitle: setting.appSubtitle, //子标题
    appTitle: setting.appTitle, //标题
    pageFooter: setting.pageFooter, //页脚
    //备份
    autoBackup: setting.autoBackup, //数据自动备份
    backupCycle: setting.backupCycle, // 备份周期 天备份一次
    backupOverdueDay: setting.backupOverdueDay, //备份保留时间(天)
    // 云存储 (七牛云)
    cloudStorage: JSON.stringify(setting.cloudStorageSetting), //
    //日期格式
    dateFormat: setting.dateFormat, //
    //时间格式
    dateTimeFormat: setting.dateTimeFormat, //
    //钉钉集成
    dingTalk: JSON.stringify(setting.dingTalkSetting), //
    sms: JSON.stringify(setting.smsSetting), //短信集成
    // 邮件集成
    email: JSON.stringify(setting.emailSetting), //
    // 主页地址/域名
    homeURL: setting.homeURL, //
    // LOGO
    logo: setting.logo, //
    logoWhite: setting.logoWhite, //
    sqlVersion: setting.sqlVersion, //
    themeColor: setting.themeColor, //主色调
    todoTaskCorn: setting.todoTaskCorn, //
    version: setting.version, //版本号
    dbVersion: setting.dbVersion,
    watermark: setting.watermark, //页面水印
    webVer: setting.webVer, //
  };

  const settings = Process("models.SystemSetting.get", {});

  let list = [];
  for (const key in newSetting) {
    if (Object.hasOwnProperty.call(newSetting, key)) {
      const element = newSetting[key];
      if (element == null || typeof element === 'object') {
        continue;
      }
      const settingOld = settings.find((s) => s.settingName === key);
      const id = settingOld?.systemSettingId;
      list.push({
        settingName: key,
        settingValue: element,
        systemSettingId: id,
        createdOn: id ? undefined : getCurrentTime(),
        modifiedOn: id ? getCurrentTime() : undefined,
      });
    }
  }
  Process("models.SystemSetting.eachsave", list, {});
}
/**
 * init the setting
 * yao run scripts.setting.init
 */
function init() {
  const setting = {
    appIntro:
      "快速搭建企业管理系统：CRM客户管理、OA办公自动化、进销存、工作流、项目管理，无需编程基础，1~3天即可交付上线。 ",
    appName: "数字化开发平台111",
    appSubtitle: "登录用户/密码：admin/admin (每周日重置数据)",
    appTitle: "美乐低代码—数字化开发平台",
    autoBackup: true,
    backupCycle: 1,
    backupOverdueDay: 30,
    cloudStorage: JSON.stringify({
      openStatus: false,
      accessKey: null,
      secretKey: null,
      bucket: null,
      host: null,
    }),
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
    dingTalk: JSON.stringify({
      openStatus: false,
      dingTalkAppKey: null,
      dingTalkAppSecret: null,
      dingTalkAgentId: null,
      nodeRole: null,
    }),
    email: JSON.stringify({
      openStatus: false,
      appId: null,
      appKey: null,
      from: null,
      fromName: null,
      cc: null,
    }),
    homeURL: "http://localhost",
    logo: "/src/assets/imgs/logo.png",
    logoWhite: "",
    pageFooter: "上海极昇数科数字科技有限公司提供技术支持",
    sms: JSON.stringify({
      openStatus: false,
      appId: null,
      appKey: null,
      signature: null,
    }),
    sqlVersion: "1.1.15",
    themeColor: "#246EBC",
    todoTaskCorn: "0 0 10 * * ?",
    version: "1.3.0",
    watermark: false,
    webVer: "1.3.6 20240124(1.3.0)",
  };
  const list = [];
  for (const key in setting) {
    if (Object.hasOwnProperty.call(setting, key)) {
      const element = setting[key];
      if (element == null || typeof element === 'object') {
        continue;
      }
      list.push({
        settingName: key,
        defaultValue: element,
      });
    }
  }
  Process("models.SystemSetting.deleteWhere", {
    wheres: [
      {
        column: "systemSettingId",
        op: "notnull",
      },
    ],
    limit: 10000,
  });

  Process("models.SystemSetting.eachsave", list, {
    createdOn: getCurrentTime(),
  });
}

function registerLicense(payload) {}
