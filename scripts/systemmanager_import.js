const { getEntityField, toCamelCase } = Require("sys.lib");
const { updateEntityToYao } = Require("sys.yao");

const cookie =
  "Hm_lvt_ca92074d58ebd132682f48bca00a5176=1706161011; uid=%5Bobject%20Object%5D; JSESSIONID=8E0E4117E05EBBE15E567E1036E5C8E7";
/**
 * 下载实体定义
 *
 * yao run scripts.systemmanager_import.download 'LayoutConfig'
 * yao run scripts.systemmanager_import.download 'User'
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
        Cookie: cookie,
      }
    );
    checkRespone(response);
    list = response.data.data;
    // 系统模型
    [
      "ReportConfig",
      "ApprovalConfig",
      "LayoutConfig",
      "TriggerConfig",
      "FollowUp",
      "TodoTask",
      "MetaApi",
      "Chart",
      "User",
      "Department",
      "Role",
      "Team",
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
    const props = getEntityProps(entity.name, cookie);
    Object.assign(entity, props);

    const fieldSet = getFieldList(entity.name, cookie);
    Object.assign(entity, { fieldSet: fieldSet });

    entity = updateIdFieldName(entity);
    Process(
      "fs.system.WriteFile",
      `/entitys/${entity.name}.json`,
      JSON.stringify(entity, null, 4)
    );
    Process("utils.time.Sleep", 1000);

    console.log(`${index}/${list.length}:${entity.name} download finished`);
    index++;
  }

  downloadOptionFields(entityName);
  downloadTagFields(entityName);
  importEntity(entityName);
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

function getEntityProps(entityName, cookie) {
  var currentTimestamp = new Date().getTime();

  const response = http.Get(
    `http://web1.demo.melecode.com/systemManager/getEntityProps?entity=${entityName}&_=${currentTimestamp}`,
    {},
    {
      Cookie: cookie,
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
      Cookie: cookie,
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
      Cookie: cookie,
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
      Cookie: cookie,
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
      Cookie: cookie,
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
      Cookie: cookie,
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
    const message = response.data.message || response.data.error;
    console.log(message);

    throw Error(message);
  }
}
/**
 * import the entity from file
 *
 * yao run scripts.systemmanager_import.importEntity 'User'
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
    delete entity.entityCode;
    let entityCode = getSystemEntityCode(entity.name);
    if (entityCode) {
      entity.entityCode = entityCode;
    }
    entityCode = Process("models.sys.entity.create", entity);
    if (!entityCode) {
      throw Error(`创建失败:${entity.name}`)
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
    ReportConfig: 45,
    ApprovalConfig: 30,
    LayoutConfig: 15, //布局，系统级别的实体
    TriggerConfig: 48,
    FollowUp: 54,
    TodoTask: 55,
    MetaApi: 51,
    Chart: 52,
    User: 21,
    Department: 22,
    Role: 23,
    Team: 24,
  };
}

function getSystemEntityCode(entityName) {
  return getSystemEntityMap()[entityName];
}
