const { loadEntityToYao } = Require("sys.yao");
const { getEntityByNameCache } = Require("sys.lib");


function getNavigationById(layoutConfigId){
  throw Error("not implemented yet");

}
// 获取导航配置
function getNavigationList() {
  loadEntityToYao("LayoutConfig");
  const [topNav] = Process("models.layoutconfig.get", {
    select: ["configName", "layoutConfigId", "shareTo", "config"],
    wheres: [
      {
        column: "applyType",
        value: "TOP_NAV",
      },
    ],
  });

  const navList = Process("models.layoutconfig.get", {
    select: ["configName", "layoutConfigId", "shareTo", "config"],
    wheres: [
      {
        column: "applyType",
        value: "NAV",
      },
    ],
  });

  let navigationList = navList;
  // if (topNav?.config) {
  //   let config = JSON.parse(topNav.config);
  //   config.navList.forEach((nav) => {
  //     let idstr = nav.layoutConfigId + "";
  //     if (idstr.includes("-")) {
  //       const [entityCode, id] = idstr.split("-");
  //       idstr = id;
  //     }
  //     idstr = parseInt(idstr);
  //     try {
  //       const layoutConfig = Process("models.layoutconfig.find", idstr, {
  //         select: ["configName", "layoutConfigId", "shareTo", "config"],
  //       });
  //       if (layoutConfig) {
  //         navigationList.push(layoutConfig);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }
  // 注意，菜单的菜单有权限的控制，需要在getRightMap()增加实体的权限控制。
  return {
    // 这个地址需要增加session后才能实现。
    // chosenNavigationId: "",
    topNavigation: { ...topNav, shareTo: "ALL" },
    navigationList,
  };
}

/**
 * 获取实体布局配置
 *
 * yao run scripts.layout.getLayoutList 'Entity1'
 * @param {*} entityName
 * @returns
 */
function getLayoutList(entityName) {
  const entity = getEntityByNameCache(entityName);
  // loadEntityToYao("LayoutConfig");
  const entityLayout = getEntityByNameCache("LayoutConfig");

  let layoutConfigs = Process("models.layoutconfig.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });
  layoutConfigs.forEach((config) => {
    config.layoutConfigId = `${entityLayout.entityCode}-${config.layoutConfigId}`;
  });

  const fields = entity.fieldSet.map((field) => {
    return {
      isUpdatable: field.updatable,
      fieldName: field.name,
      isNameField: field.nameFieldFlag,
      fieldLabel: field.label,
      isNullable: field.nullable,
      isCreatable: field.creatable,
      fieldType: field.type,
      referenceName: field.referTo?.replace(",", ""),
    };
  });

  const layoutSelfListConfig = {
    applyType: "LIST",
    entityCode: entity.entityCode,
    shareTo: "SELF",
    config: JSON.stringify(fields),
  };

  const layoutAllListConfig = {
    applyType: "LIST",
    entityCode: entity.entityCode,
    shareTo: "ALL",
    config: JSON.stringify(fields),
  };

  const data = {
    FILTER: [],
    nameFieldName: entity.idFieldName,
    titleWidthForSelf: null,
    quickFilterLabel: "",
    chosenListType: null,
    advFilter: null,
    idFieldName: entity.idFieldName,
    LIST: {
      ALL:
        layoutConfigs.find(
          (c) => c.applyType === "LIST" && c.shareTo === "ALL"
        ) || layoutAllListConfig,
      SELF:
        layoutConfigs.find(
          (c) => c.applyType === "LIST" && c.shareTo === "SELF"
        ) || layoutSelfListConfig,
      titleWidthForAll: null, //JSON.stringify(fieldsTitle),
    },
  };

  const TAB = layoutConfigs.find((config) => config.applyType === "TAB");
  const SEARCH = layoutConfigs.find((config) => config.applyType === "SEARCH");
  const ADD = layoutConfigs.find((config) => config.applyType === "ADD");

  data.TAB = TAB || data.TAB;
  data.SEARCH = SEARCH || data.SEARCH;
  data.ADD = ADD || data.ADD;
  return data;
}
/**
 * 创建或是更新布局配置
 *
 * yao run scripts.layout.saveConfig
 * @param {string|null} recordId
 * @param {string} applyType
 * @param {*} formModel
 */
function saveConfig(recordId, applyType2, formData) {
  const entityLayoutConfig = getEntityByNameCache("LayoutConfig");

  // console.log("recordId:", recordId);
  let idstr = recordId;
  if (!recordId) {
    // 新建
    idstr = null;
  }

  if (recordId) {
    // if (recordId.includes("-")) {
    const [layoutEntityCode, confiId] = recordId.split("-");
    if (layoutEntityCode != entityLayoutConfig.entityCode) {
      throw Error(
        `不正确的布局ID:${layoutEntityCode},期望是：${entityLayoutConfig.entityCode}`
      );
    }
    // } else {
    //   idstr = entityLayoutConfig.entityCode + "-" + recordId;
    // }
  }
  // applyType=LIST 列表设计
  let { applyType, config, entityCode, shareTo, configName } = formData;
  if (!applyType) {
    applyType = applyType2;
  }
  if (!applyType) {
    throw Error(`需要填写布局配置类型`);
  }

  loadEntityToYao("LayoutConfig");
  // 自定义列表显示，shareTo = SELF
  // 默认列表显示，shareTo = ALL
  const data = Process("scripts.curd.saveRecord", "LayoutConfig", idstr, {
    configName,
    config,
    applyType,
    entityCode,
    shareTo,
  });
  return data;
  // formModel = {"config":"[{\"isUpdatable\":false,\"fieldName\":\"yonghuId\",\"isNameField\":false,\"fieldLabel\":\"id主键\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"PrimaryKey\"},{\"isUpdatable\":false,\"fieldName\":\"createdOn\",\"isNameField\":false,\"fieldLabel\":\"创建时间\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"DateTime\"},{\"isUpdatable\":false,\"fieldName\":\"createdBy\",\"isNameField\":false,\"fieldLabel\":\"创建用户\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"Reference\",\"referenceName\":\"User\"},{\"isUpdatable\":false,\"fieldName\":\"modifiedBy\",\"isNameField\":false,\"fieldLabel\":\"修改用户\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"Reference\",\"referenceName\":\"User\"},{\"isUpdatable\":false,\"fieldName\":\"modifiedOn\",\"isNameField\":false,\"fieldLabel\":\"最近修改时间\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"DateTime\"}]","entityCode":1532,"applyType":"LIST","shareTo":"ALL"}
  // return `${entityLayoutConfig.entityCode}-${configId}`;
}

// 切换使用导航
function saveUserLayoutCache(cacheKey, cacheValue) {
  // cacheKey=LIST:TestUser&cacheValue=ALL
  // cacheKey=LIST:TestUser&cacheValue=SELF
  // Process("session.")
}
// 删除布局配置
function deleteConfig(recordId) {
  loadEntityToYao("LayoutConfig");
  Process("models.layoutconfig.delete", recordId);
}

// 数据导出
function excelDataExcel(formModel) {}
