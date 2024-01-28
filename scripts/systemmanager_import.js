const { getEntityField, toCamelCase, getEntityByName } = Require("sys.lib");
const { updateEntityToYao, loadEntityToYao } = Require("sys.yao");

function getCookie() {
  const cookie = Process("utils.env.Get", "METALOWCODE_COOKIE");
  if (!cookie) {
    throw Error("请维护环境变量：METALOWCODE_COOKIE");
  }
  return cookie;
}
/**
 * 下载实体定义
 *
 * yao run scripts.systemmanager_import.download
 *
 * yao run scripts.systemmanager_import.download 'LayoutConfig'
 *
 * yao run scripts.systemmanager_import.download 'User'
 *
 * yao run scripts.systemmanager_import.download 'Baojiadan'
 * @param {string|null} entityName
 */
function download(entityName) {
  // get list
  var currentTimestamp = new Date().getTime();

  let list = [];

  if (entityName) {
    list.push({
      name: entityName,
    });
  } else {
    const response = http.Get(
      `http://web1.demo.melecode.com/systemManager/getEntitySet?_=${currentTimestamp}`,
      {},
      {
        Cookie: getCookie(),
      }
    );
    checkRespone(response);
    list = response.data.data;
    // 系统模型
    [
      "OptionItem",
      "TagItem",
      "ReferenceListMap",
      "ReferenceCache",
      "SystemSetting",
      "FormLayout",
      "DataListView",
      "RouterMenu",
      "StatusItem",
      "LayoutConfig",
      "User",
      "Department",
      "Role",
      "Team",
      "LoginLog",
      "ApprovalConfig",
      "ApprovalFlow",
      "ApprovalHistory",
      "ApprovalTask",
      "ReportConfig",
      "RecycleBin",
      "Notification",
      "TriggerConfig",
      "RevisionHistory",
      "ShareAccess",
      "MetaApi",
      "Chart",
      "TriggerLog",
      "FollowUp",
      "TodoTask",
      "BackupDatabase",
    ].forEach((key) => list.push({ name: key }));
  }
  console.log(`Entity count: ${list.length}`);
  let index = 0;

  for (let entity of list) {
    const fname = `/entitys/${entity.name}.json`;
    if (Process("fs.system.Exists", fname)) {
      index++;
      continue;
    }
    const props = getEntityProps(entity.name, getCookie());
    Object.assign(entity, props);
    if (
      typeof entity.mainEntity === "object" &&
      entity.mainEntity &&
      entity.mainEntity.name
    ) {
      entity.mainEntity = entity.mainEntity.name;
    }
    const fieldSet = getFieldList(entity.name, getCookie());

    // for (let f of fieldSet) {

    // }
    fieldSet.forEach((f, idx) => {
      // if (f.type === "Reference") {
      let fieldData = getField(entity.name, f.name);
      delete fieldData.owner;
      if (Array.isArray(fieldData.referTo)) {
        // console.log("fieldData.referTo",fieldData.referTo)
        fieldData.referTo =
          fieldData.referTo.map((r) => r.name).join(",") + ",";
        // console.log("fieldData.referTo2",fieldData.referTo)
      }
      fieldSet[idx] = fieldData;
      f = fieldData;
      Process("utils.time.Sleep", 50);
      // }
    });
    Object.assign(entity, { fieldSet: fieldSet });

    entity = updateIdFieldName(entity);
    Process(
      "fs.system.WriteFile",
      `/entitys/${entity.name}.json`,
      JSON.stringify(entity, null, 4)
    );
    Process("utils.time.Sleep", 100);

    console.log(`${index}/${list.length}:${entity.name} download finished`);
    index++;
  }

  downloadOptionFields(entityName); //字段的OptionList,需要单独下载
  downloadTagFields(entityName); //字段的TagList，也需要单独的下载
  importEntity(entityName); //导入实体定义到数据库
  downloadFormLayout(entityName); //下载表单布局设置
  if (!entityName) {
    downlaodNav(); //下载导航设置
  }
}

function updateIdFieldName(entity) {
  if (entity.idFieldName) {
    return entity;
  }
  if (!entity.idFieldName) {
    if (Array.isArray(entity.fieldSet)) {
      const primaryField = entity.fieldSet.find((f) => f.type == "PrimaryKey");
      if (primaryField) {
        entity.idFieldName = primaryField.name;
      }
    }
  }
  if (!entity.idFieldName) {
    entity.idFieldName = toCamelCase(entity.name) + "Id";
  }
  return entity;
}

function getField(entityName, fieldName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getField?entity=${entityName}&field=${fieldName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}

function getEntityProps(entityName, cookie) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getEntityProps?entity=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}
/**
 * 读取实体字段列表
 * @param {string} entityName
 * @param {string} cookie
 * @returns
 */
function getFieldList(entityName, cookie) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getFieldListOfEntity?entity=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}

/**
 * yao run scripts.systemmanager_import.downloadOptionFields
 * @returns
 */
function downloadOptionFields(entityName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getOptionFields?_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  let optionFields = response.data.data;
  //   console.log("optionFields>>>>>>>>>",optionFields)
  let index = 0;
  if (entityName) {
    optionFields = optionFields.filter(
      (option) => option.entityName === entityName
    );
  }
  for (const option of optionFields) {
    const fname = `/entitys/${option.entityName}.json`;
    let entityContent = Process("fs.system.ReadFile", fname);
    entityContent = JSON.parse(entityContent);

    for (const field of option.fieldList) {
      const optionItems = getOptionItems(option.entityName, field.fieldName);
      const options = optionItems.map((item) => {
        return {
          key: item.label,
          value: item.value,
        };
      });
      //   console.log("optionItems",optionItems)
      const fieldData = getEntityField(option.entityName, field.fieldName);
      //   console.log("fieldData",fieldData)

      if (fieldData.fieldId) {
        Process("models.sys.entity.field.update", fieldData.fieldId, {
          optionList: options,
        });
      }
      entityContent.fieldSet = entityContent.fieldSet.map((f) => {
        if (field.fieldName == f.name) {
          return { ...f, optionList: options };
        }
        return f;
      });
      Process("utils.time.Sleep", 1000);
    }
    Process(
      "fs.system.WriteFile",
      fname,
      JSON.stringify(entityContent, null, 4)
    );
    console.log(`${fname} optionList updated`);
    index++;
    console.log(
      `${index}/${optionFields.length}:${option.entityName} options update finished`
    );
  }
}

function getOptionItems(entityName, field) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getOptionItems?entity=${entityName}&field=${field}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}

/**
 * yao run scripts.systemmanager_import.downloadTagFields
 * @returns
 */
function downloadTagFields(entityName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getTagFields?_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  let tagFields = response.data.data;

  if (entityName) {
    tagFields = tagFields.filter((option) => option.entityName === entityName);
  }
  //   console.log("optionFields>>>>>>>>>",optionFields)
  let index = 0;

  for (const tag of tagFields) {
    const fname = `/entitys/${tag.entityName}.json`;
    let entityContent = Process("fs.system.ReadFile", fname);
    entityContent = JSON.parse(entityContent);

    for (const field of tag.fieldList) {
      const tagItems = getTagItems(tag.entityName, field.fieldName);
      const tags = tagItems.map((item) => {
        return item.value;
      });
      const fieldData = getEntityField(tag.entityName, field.fieldName);
      if (fieldData.fieldId) {
        Process("models.sys.entity.field.update", fieldData.fieldId, {
          tagList: tags,
        });
      }
      entityContent.fieldSet = entityContent.fieldSet.map((f) => {
        if (f.name == field.fieldName) {
          return { ...f, tagList: tags };
        }
        return f;
      });
      Process("utils.time.Sleep", 1000);
    }
    Process(
      "fs.system.WriteFile",
      fname,
      JSON.stringify(entityContent, null, 4)
    );
    console.log(`${fname} tagList updated`);
    index++;
    console.log(
      `${index}/${tagFields.length}:${tag.entityName} tags update finished`
    );
  }
}

function getTagItems(entityName, field) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getTagItems?entity=${entityName}&field=${field}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}

function checkRespone(response) {
  if (response.status !== 200) {
    console.log(response.message);
    throw Error(response.message);
  }

  if (response.data.code !== 200) {
    const message =
      response.data.message || response.data.error || response.statusText;
    console.log(response);

    throw Error(message);
  }
}
/**
 * import the entity from file
 *
 * yao run scripts.systemmanager_import.importEntity
 *
 * yao run scripts.systemmanager_import.importEntity 'User'
 *
 * yao run scripts.systemmanager_import.importEntity 'TriggerConfig'
 * @param {string|null} entityName
 */
function importEntity(entityName) {
  let fileList = [];
  if (entityName) {
    fileList.push(`/entitys/${entityName}.json`);
  } else {
    fileList = Process("fs.system.ReadDir", "/entitys/");
  }

  let index = 0;
  for (const f of fileList) {
    let entityContent = Process("fs.system.ReadFile", f);
    entityContent = JSON.parse(entityContent);

    let fieldSet = [...entityContent.fieldSet];

    let entity = { ...entityContent };
    delete entity.fieldSet;

    // console.log("entity>>>>>>>>", entity);

    Process("models.sys.entity.deletewhere", {
      wheres: [
        {
          column: "name",
          value: entity.name,
        },
      ],
    });
    if (entity.entityCode) {
      Process("models.sys.entity.field.deletewhere", {
        wheres: [
          {
            column: "entityCode",
            value: entity.entityCode,
          },
        ],
      });
    }

    if (
      typeof entity.mainEntity === "object" &&
      entity.mainEntity &&
      entity.mainEntity.name
    ) {
      entity.mainEntity = entity.mainEntity.name;
    }

    entity = updateIdFieldName(entity);
    // check if is the system entity
    if (!entity.entityCode) {
      entity.entityCode = getSystemEntityCode(entity.name);
    }
    // delete entity.entityCode;
    // let entityCode = getSystemEntityCode(entity.name);
    // if (entityCode) {
    //   entity.entityCode = entityCode;
    // }
    entityCode = Process("models.sys.entity.create", entity);
    if (!entityCode) {
      throw Error(`创建失败:${entity.name}`);
    }
    //防止存在同名的字段列表
    Process("models.sys.entity.field.deletewhere", {
      wheres: [
        {
          column: "entityCode",
          value: entityCode,
        },
      ],
    });
    fieldSet.forEach((f) => delete f.fieldId);
    var res = Process("models.sys.entity.field.EachSave", fieldSet, {
      entityCode: entityCode,
    });

    if (res?.code && res.message) {
      throw Error(`${entity.name}>>|Exception:${res?.code}|${res.message}`);
    }

    // create database table for entity
    const yaoModel = updateEntityToYao(entity.name);
    if (entityName) {
      console.log("yaoModel>>>>>>>>>", yaoModel);
    }
    index++;
    console.log(`${index}/${fileList.length}:${entity.name} imported`);
  }
}

function getSystemEntityMap() {
  //由于前端部分权限检查的代码绑定了实体的代码，实体名称和实体代码的映射关系保持一致
  return {
    OptionItem: 3, //"单选项
    TagItem: 4, //"多选项
    ReferenceListMap: 5, //"多对多中间表
    ReferenceCache: 6, //"名称字段缓存
    SystemSetting: 7, //"系统参数
    FormLayout: 8, //"表单布局
    DataListView: 9, //"数据列表视图
    RouterMenu: 10, //"系统导航菜单
    StatusItem: 12, //"状态项
    LayoutConfig: 15, //"布局设置
    User: 21, //"用户
    Department: 22, //"部门
    Role: 23, //"权限角色
    Team: 24, //"团队
    LoginLog: 25, //"登录日志
    ApprovalConfig: 30, //"审批配置
    ApprovalFlow: 31, //"审批流程
    ApprovalHistory: 32, //"审批历史
    ApprovalTask: 33, //"审批任务
    ReportConfig: 45, //"报表模板
    RecycleBin: 46, //"回收站
    Notification: 47, //"消息通知
    TriggerConfig: 48, //"触发器
    RevisionHistory: 49, //"修改历史
    ShareAccess: 50, //"共享访问
    MetaApi: 51, //"API管理
    Chart: 52, //"仪表盘
    TriggerLog: 53, //"触发器日志
    FollowUp: 54, //"跟进
    TodoTask: 55, //"待办
    BackupDatabase: 56, //"数据库备份
    Yanshishiti: 1001, //"演示实体
  };
}

function getSystemEntityCode(entityName) {
  return getSystemEntityMap()[entityName];
}

/**
 * yao run scripts.systemmanager_import.downloadFormLayout
 * @param {string|null} entityName
 */
function downloadFormLayout(entityName) {
  let entiyList = [];
  if (entityName) {
    entiyList.push(entityName);
  } else {
    const list = Process("models.sys.entity.get", {
      select: ["name"],
      limit: 10000,
    });
    list.forEach((l) => entiyList.push(l.name));
  }

  let index = 0;
  entiyList.forEach((name) => {
    getFormLayout(name);

    index++;
    console.log(`${index}/${entiyList.length}:${name} form layout downlaod`);
    Process("utils.time.Sleep", 1000);
  });
}
/**
 * yao run scripts.systemmanager_import.getFormLayout 'User'
 * @param {string} entityName
 * @returns
 */
function getFormLayout(entityName) {
  var currentTimestamp = new Date().getTime();
  const entity = getEntityByName(entityName);
  if (!entity) {
    throw Error(`实体${entityName}不存在`);
  }
  const response = http.Get(
    `http://web1.demo.melecode.com/formLayout/get?entity=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  const layoutData = response.data.data;
  // console.log(layoutData);
  if (!layoutData || typeof layoutData !== "object" || !layoutData.layoutJson) {
    return;
  }
  Process("models.sys.form.layout.deletewhere", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });
  const layoutForm = {
    layoutName: layoutData.layoutName,
    entityCode: entity.entityCode,
    layoutJson: layoutData.layoutJson,
  };

  Process("models.sys.form.layout.save", layoutForm);
  const fname = `/formlayout/${entityName}.json`;

  layoutForm.entityLabel = entity.label;
  // for good view
  // layoutForm.layoutJson = JSON.parse(layoutForm.layoutJson)
  Process("fs.system.WriteFile", fname, JSON.stringify(layoutForm, null, 4));

  // let data = {
  //   formLayoutId: "0000008-8c49a51e848f4421b24d86ed29f6db10",
  //   layoutName: "默认表单布局",
  //   entityCode: 21,
  //   layoutJson:'',
  //   createdOn: "2023-10-12 13:32:22",
  //   createdBy: "0000021-00000000000000000000000000000001",
  //   modifiedOn: "2023-10-17 11:35:36",
  //   modifiedBy: "0000021-00000000000000000000000000000001",
  //   optionData: {
  //     jobTitle: [
  //       {
  //         value: 4,
  //         label: "总监",
  //         displayOrder: 1,
  //       },
  //       {
  //         value: 2,
  //         label: "主管",
  //         displayOrder: 2,
  //       },
  //       {
  //         value: 3,
  //         label: "经理",
  //         displayOrder: 3,
  //       },
  //       {
  //         value: 5,
  //         label: "部长",
  //         displayOrder: 4,
  //       },
  //       {
  //         value: 1,
  //         label: "员工",
  //         displayOrder: 5,
  //       },
  //       {
  //         value: 6,
  //         label: "a",
  //         displayOrder: 6,
  //       },
  //       {
  //         value: 7,
  //         label: "测试",
  //         displayOrder: 7,
  //       },
  //     ],
  //     aaaaaa: [
  //       {
  //         value: 1,
  //         label: "11",
  //         displayOrder: 1,
  //       },
  //       {
  //         value: 2,
  //         label: "222",
  //         displayOrder: 2,
  //       },
  //       {
  //         value: 3,
  //         label: "33",
  //         displayOrder: 3,
  //       },
  //       {
  //         value: 4,
  //         label: "111",
  //         displayOrder: 4,
  //       },
  //     ],
  //     yonghuxingbie: [
  //       {
  //         value: 1,
  //         label: "男",
  //         displayOrder: 1,
  //       },
  //       {
  //         value: 2,
  //         label: "女",
  //         displayOrder: 2,
  //       },
  //     ],
  //   },
  //   formUploadParam: {
  //     cloudStorage: "false",
  //     cloudUploadToken: "",
  //     picUploadURL: "DSV['uploadServer'] + '/picture/upload'",
  //     fileUploadURL: "DSV['uploadServer'] + '/file/upload'",
  //     picDownloadPrefix: "/picture/get/",
  //     fileDownloadPrefix: "/file/get/",
  //   },
  //   entityRecord: {
  //     modifiedOn: "2023-10-17 11:35:36",
  //     entityCode: 21,
  //     formLayoutId: "0000008-8c49a51e848f4421b24d86ed29f6db10",
  //     createdBy: "0000021-00000000000000000000000000000001",
  //     modifiedBy: "0000021-00000000000000000000000000000001",
  //     layoutJson:
  //       '',
  //     createdOn: "2023-10-12 13:32:22",
  //     layoutName: "默认表单布局",
  //   },
  // };

  // return response.data.data;
}

/**
 * 单独导入表单布局
 * yao run scripts.systemmanager_import.importFormLayout
 * @param {string|null} entityName
 */
function importFormLayout(entityName) {
  let fileList = [];
  if (entityName) {
    fileList.push(`/formlayout/${entityName}.json`);
  } else {
    fileList = Process("fs.system.ReadDir", "/formlayout/");
  }

  let index = 0;
  for (const f of fileList) {
    let entityContent = Process("fs.system.ReadFile", f);
    entityContent = JSON.parse(entityContent);

    const [layout] = Process("models.sys.form.layout.get", {
      wheres: [
        {
          column: "entityCode",
          value: entityContent.entityCode,
        },
      ],
    });
    if (layout?.formLayoutId) {
      entityContent.formLayoutId = layout?.formLayoutId;
    }
    Process("models.sys.form.layout.save", entityContent);

    index++;
    console.log(
      `${index}/${fileList.length}:${entityContent.entityLabel} form layout imported`
    );
  }
}

//yao run scripts.systemmanager_import.downlaodNav
function downlaodNav() {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/layout/getNavigationList?_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  let navData = response.data.data;
  console.log("navData", navData);
  Process(
    "fs.system.writefile",
    "/navList.json",
    JSON.stringify(navData, null, 4)
  );
  importNav();
}
/**
 * yao run scripts.systemmanager_import.importNav
 */
function importNav() {
  const ftext = Process("fs.system.readfile", "/navList.json");
  demoData = JSON.parse(ftext);

  loadEntityToYao("LayoutConfig");
  Process("models.LayoutConfig.deletewhere", {
    wheres: [
      {
        column: "layoutConfigId",
        op: "notnull",
      },
    ],
  });
  const navList = JSON.parse(demoData.topNavigation.config).navList;
  demoData.navigationList.forEach((nav) => {
    nav.applyType = "NAV";
    const { formData } = Process("scripts.layout.saveConfig", null, null, nav);

    navList.forEach((n) => {
      if (n.layoutConfigId === nav.layoutConfigId) {
        n.layoutConfigId = formData.layoutConfigId;
      }
    });
  });

  const topNav = {
    configName: null,
    shareTo: "ALL",
    applyType: "TOP_NAV",
    config: JSON.stringify({
      navList,
    }),
  };
  const { formData } = Process("scripts.layout.saveConfig", null, null, topNav);

  console.log(formData);
}
