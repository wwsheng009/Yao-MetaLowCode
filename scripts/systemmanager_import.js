const { getEntitySingleFieldByname, toCamelCase, getEntityByName } =
  Require("sys.lib");
const { updateEntityToYao, loadEntityToYao, entityToYaoModel } =
  Require("sys.yao");

function getCookie() {
  const cookie = Process("utils.env.Get", "METALOWCODE_COOKIE");
  if (!cookie) {
    throw Error("请维护环境变量：METALOWCODE_COOKIE");
  }
  return cookie;
}

function getWebSite() {
  const website = Process("utils.env.Get", "METALOWCODE_WEBSITE");
  if (!website) {
    throw Error("请维护环境变量：METALOWCODE_WEBSITE");
  }
  return website;
}
/**
 * 下载实体定义,并导入到系统
 *
 * yao run scripts.systemmanager_import.download 'TriggerConfig'
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
      `${getWebSite()}/systemManager/getEntitySet?_=${currentTimestamp}`,
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

    fieldSet.forEach((f, idx) => {
      let fieldData = getEntityFieldProps(entity.name, f.name);
      delete fieldData.owner;
      if (Array.isArray(fieldData.referTo)) {
        fieldData.referTo =
          fieldData.referTo.map((r) => r.name).join(",") + ",";
      }
      fieldSet[idx] = fieldData;
      f = fieldData;
      Process("utils.time.Sleep", 50);
    });
    if (entity.name === "TriggerConfig") {
      const field = fieldSet.find((f) => f.name === "actionType");
      field.type = "Option";
      field.optionList = [
        {
          label: "字段更新",
          value: 1,
          displayOrder: 1,
        },
        {
          label: "字段聚合",
          value: 2,
          displayOrder: 2,
        },
        {
          label: "分组聚合",
          value: 3,
          displayOrder: 3,
        },
        {
          label: "自动创建",
          value: 15,
          displayOrder: 15,
        },
        {
          label: "数据校验",
          value: 4,
          displayOrder: 4,
        },
        {
          label: "发送通知",
          value: 5,
          displayOrder: 5,
        },
        {
          label: "自动审批",
          value: 6,
          displayOrder: 6,
        },
        {
          label: "自动撤销审批",
          value: 7,
          displayOrder: 7,
        },
        {
          label: "自动分配",
          value: 8,
          displayOrder: 8,
        },
        {
          label: "自动共享",
          value: 9,
          displayOrder: 9,
        },
        {
          label: "自动取消共享",
          value: 10,
          displayOrder: 10,
        },
        {
          label: "自动删除",
          value: 12,
          displayOrder: 12,
        },
        {
          label: "回调URL",
          value: 14,
          displayOrder: 14,
        },
      ];
    }
    console.log("fieldSet",fieldSet)
    Object.assign(entity, { fieldSet: fieldSet });

    if (entity.entityCode < 1001) {
      entity.systemEntityFlag = true; //内部表
    }

    entity = updateIdFieldName(entity);
    Process(
      "fs.system.WriteFile",
      `/entitys/${entity.name}.json`,
      JSON.stringify(entity, null, 2)
    );
    Process("utils.time.Sleep", 100);

    console.log(`${index}/${list.length}:${entity.name} download finished`);
    index++;
  }

  //update the entityModel with optionList
  downloadOptionFields(entityName); //字段的OptionList,需要单独下载

  //update the entityModel with tagList
  downloadTagFields(entityName); //字段的TagList，也需要单独的下载

  importEntity(entityName); //导入实体定义到数据库
  downloadFormLayout(entityName); //下载表单布局设置
  downloadLayoutList(entityName); //下载报表布局设置
  if (!entityName) {
    downlaodNav(); //下载导航设置
  }
}

/**
 * import the local files for entity or import all
 *
 * yao run scripts.systemmanager_import.importData
 * @param {string|null} entityName
 */
function importData(entityName) {
  importEntity(entityName);
  importFormLayout(entityName);
  importLayoutList(entityName);
  if (!entityName) {
    importNav(); //下载导航设置
  }
}

/**
 * update the fidFieldName for the entity
 *
 * @param {object} entity
 * @returns
 */
function updateIdFieldName(entity) {
  if (entity.idFieldName) {
    return entity;
  }
  if (!entity.idFieldName) {
    if (Array.isArray(entity.fieldSet)) {
      const primaryField = entity.fieldSet.find((f) => f.idFieldFlag == true);
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

/**
 * download the single field propertys for the entity
 *
 * @param {string} entityName
 * @param {string} fieldName
 * @returns
 */
function getEntityFieldProps(entityName, fieldName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getField?entity=${entityName}&field=${fieldName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  return response.data.data;
}

/**
 * get entity properties for the entity
 *
 * @param {string} entityName
 * @returns
 */
function getEntityProps(entityName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getEntityProps?entity=${entityName}&_=${currentTimestamp}`,
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
function getFieldList(entityName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getFieldListOfEntity?entity=${entityName}&_=${currentTimestamp}`,
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
 * @param {string|null} entityName
 */
function downloadOptionFields(entityName) {
  console.log("downloadOptionFields:" + entityName)
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getOptionFields?_=${currentTimestamp}`,
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
          label: item.label,
          value: item.value,
          displayOrder: item.displayOrder,
        };
      });
      const fieldData = getEntitySingleFieldByname(
        option.entityName,
        field.fieldName
      );
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
      JSON.stringify(entityContent, null, 2)
    );
    console.log(`${fname} optionList updated`);
    index++;
    console.log(
      `${index}/${optionFields.length}:${option.entityName} options update finished`
    );
  }
}

function getOptionItems(entityName, fieldName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getOptionItems?entity=${entityName}&field=${fieldName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  const OptionItems = response.data.data;
  Process("models.OptionItem.deletewhere", {
    wheres: [
      {
        column: "entityName",
        value: entityName,
      },
      {
        column: "fieldName",
        value: fieldName,
      },
    ],
  });
  OptionItems.forEach((item, idx) => {
    item.displayOrder = idx + 1;
    item.systemFlag ||= 0;
  });

  var res = Process("models.OptionItem.EachSave", OptionItems, {
    entityName,
    fieldName,
  });

  if (res?.code && res.message) {
    throw Error(`${entity.name}>>|Exception:${res?.code}|${res.message}`);
  }

  return response.data.data;
}

/**
 * 下载标签列表
 *
 * yao run scripts.systemmanager_import.downloadTagFields
 *
 * @param {string|null} entityName
 */
function downloadTagFields(entityName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getTagFields?_=${currentTimestamp}`,
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
        return {
          label: item.label,
          value: item.value,
          displayOrder: item.displayOrder,
        };
      });
      const fieldData = getEntitySingleFieldByname(
        tag.entityName,
        field.fieldName
      );
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
      JSON.stringify(entityContent, null, 2)
    );
    console.log(`${fname} tagList updated`);
    index++;
    console.log(
      `${index}/${tagFields.length}:${tag.entityName} tags update finished`
    );
  }
}

/**
 *
 * yao run scripts.systemmanager_import.getTagItems 'TodoTask' 'remindType'
 *
 * yao run scripts.systemmanager_import.getTagItems 'Kehuguanli' 'kehubiaoqian'
 *
 * @param {string} entityName
 * @param {string} fieldName
 * @returns
 */
function getTagItems(entityName, fieldName) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/systemManager/getTagItems?entity=${entityName}&field=${fieldName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  const tagItems = response.data.data;
  Process("models.TagItem.deletewhere", {
    wheres: [
      {
        column: "entityName",
        value: entityName,
      },
      {
        column: "fieldName",
        value: fieldName,
      },
    ],
  });
  tagItems.forEach((item, idx) => (item.displayOrder = idx + 1));
  var res = Process("models.TagItem.EachSave", tagItems, {
    entityName,
    fieldName,
  });

  if (res?.code && res.message) {
    throw Error(`${entity.name}>>|Exception:${res?.code}|${res.message}`);
  }

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
 * 从文件中导入实体的定义到数据库表sys.entity与sys.entity.field
 *
 * 同时在数据库中创建与实体对应的数据库表定义
 *
 * 注意：此操作不会创建yao dsl文件。
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
      Process("models.sys.entity.deletewhere", {
        wheres: [
          {
            column: "entityCode",
            value: entity.entityCode,
          },
        ],
      });

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
    if (entity.entityCode < 1001) {
      entity.systemEntityFlag = true; //内部表
    }
    // delete entity.entityCode;
    // let entityCode = getSystemEntityCode(entity.name);
    // if (entityCode) {
    //   entity.entityCode = entityCode;
    // }
    let entityCode = ""
    try {
      entityCode = Process("models.sys.entity.create", entity);
    if (!entityCode) {
      throw Error(`创建失败:${entity.name}`);
    }
    } catch (error) {
      console.log(`创建失败:${entity.name}`)
      throw error
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
    fieldSet.forEach((f) => {
      delete f.fieldId;
      if (!f.updatable || !f.creatable) {
        f.reserved = true;
      }
    });
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
/**
 * 系统entity列表映射
 * @returns
 */
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
    console.log(`${index}/${entiyList.length}:${name} form layout processed`);
    Process("utils.time.Sleep", 1000);
  });
}
/**
 * yao run scripts.systemmanager_import.getFormLayout 'Gongyingshangguanli'
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
    `${getWebSite()}/formLayout/get?entity=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  try {
    checkRespone(response);

  } catch (err) {
    console.log(`错误：` + err.code + err.message)
    return
  }
  const layoutData = response.data.data;
  // console.log(layoutData);
  if (!layoutData || typeof layoutData !== "object" || !layoutData.layoutJson) {
    return;
  }
  Process("models.formlayout.deletewhere", {
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

  Process("models.formlayout.save", layoutForm);
  const fname = `/formlayout/${entityName}.json`;

  layoutForm.entityLabel = entity.label;
  // for good view
  // layoutForm.layoutJson = JSON.parse(layoutForm.layoutJson)
  Process("fs.system.WriteFile", fname, JSON.stringify(layoutForm, null, 2));
}

/**
 * 有了表单布局才能使用表单创建数据。
 *
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

    const [layout] = Process("models.formlayout.get", {
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
    Process("models.formlayout.save", entityContent);

    index++;
    console.log(
      `${index}/${fileList.length}:${entityContent.entityLabel} 表单布局 imported`
    );
  }
}

//yao run scripts.systemmanager_import.downlaodNav
function downlaodNav() {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `${getWebSite()}/layout/getNavigationList?_=${currentTimestamp}`,
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
    JSON.stringify(navData, null, 2)
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

/**
 * yao run scripts.systemmanager_import.downloadLayoutList 'WMSgongyingshangxinxi'
 * @param {string|null} entityName
 */
function downloadLayoutList(entityName) {
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
    getLayoutList(name);
    index++;
    console.log(`${index}/${entiyList.length}:${name} layout list downlaod`);
    Process("utils.time.Sleep", 500);
  });
}

function getLayoutList(entityName) {
  var currentTimestamp = new Date().getTime();
  const response = http.Get(
    `${getWebSite()}/layout/getLayoutList?entityName=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);

  let data = response.data.data;
  Process(
    "fs.system.writefile",
    `/layoutlist/${entityName}.json`,
    JSON.stringify(data, null, 2)
  );
  return data;
}

/**
 * yao run scripts.systemmanager_import.importLayoutList
 * @param {string} entityName
 */
function importLayoutList(entityName) {
  let fileList = [];
  if (entityName) {
    fileList.push(`/layoutlist/${entityName}.json`);
  } else {
    fileList = Process("fs.system.ReadDir", "/layoutlist/");
  }

  function saveConfig(config) {
    if (!config) {
      return;
    }
    Process("models.layoutconfig.deletewhere", {
      wheres: [
        {
          column: "entityCode",
          value: config.entityCode,
        },
        {
          column: "applyType",
          value: config.applyType,
        },
        {
          column: "shareTo",
          value: config.shareTo,
        },
      ],
    });
    delete config.layoutConfigId;
    delete config.createdBy;
    Process("models.layoutconfig.save", config);
  }
  let index = 0;
  for (const f of fileList) {
    let entityContent = Process("fs.system.ReadFile", f);
    entityContent = JSON.parse(entityContent);

    saveConfig(entityContent["SEARCH"]); //搜索字段
    saveConfig(entityContent["TAB"]); //加载页签
    saveConfig(entityContent["ADD"]); //创建相关
    if (entityContent["LIST"]) {
      saveConfig(entityContent["LIST"]["ALL"]); //列表-默认
      saveConfig(entityContent["LIST"]["SELF"]); //列表-自定义
    }
    index++;
    console.log(
      `${index}/${fileList.length}:${
        entityContent.quickFilterLabel || ""
      } 列表布局 imported`
    );
  }
}
/**
 * 下载一个实体的数据。
 *
 * yao run scripts.systemmanager_import.downloadEntityData 'User'
 * @param {string} entityName
 * @returns
 */
function downloadEntityData(entityName) {
  var currentTimestamp = new Date().getTime();

  const [entity] = Process("models.sys.entity.get", {
    select: ["name"],
    wheres: [
      {
        column: "name",
        value: entityName,
      },
    ],
    withs: {
      fieldSet: {
        query: {
          select: ["name", "label", "type"],
        },
      },
    },
  });
  if (!entity?.fieldSet) {
    throw Error(`实体:${entityName}不存在`);
  }

  const response = http.Post(
    `${getWebSite()}/crud/listQuery?_=${currentTimestamp}`,
    {
      mainEntity: entityName,
      fieldsList: entity.fieldSet.map((f) => f.name).join(","),
      filter: { equation: "AND", items: [] },
      pageSize: 200000,
      pageNo: 1,
      sortFields: [{ fieldName: "modifiedOn", type: "DESC" }],
      advFilter: {},
      quickFilter: "",
      builtInFilter: {},
      statistics: [],
    },
    null,
    null,
    {
      Cookie: getCookie(),
    }
  );
  checkRespone(response);
  Process(
    "fs.system.writefile",
    `/download/${entityName}.json`,
    JSON.stringify(response.data.data, null, 2)
  );
  return response.data.data;
}
