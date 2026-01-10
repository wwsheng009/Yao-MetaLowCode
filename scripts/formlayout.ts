import { Process } from "@yao/runtime";
import { getEntityByNameCache } from "./sys/lib";

function updateFormLayout(layoutId, layoutJson) {
  Process("models.formlayout.update", layoutId, {
    layoutJson,
  });
  return layoutId;
  //   layoutJson = {
  //     widgetList: [
  //       {
  //         type: "reference",
  //         alias: "",
  //         icon: "reference-field",
  //         formItemFlag: true,
  //         options: {
  //           name: "ownerUser",
  //           keyNameEnabled: false,
  //           keyName: "",
  //           label: "所属用户",
  //           labelAlign: "",
  //           placeholder: "",
  //           columnWidth: "200px",
  //           size: "",
  //           labelWidth: null,
  //           labelHidden: false,
  //           labelWrap: false,
  //           disabled: false,
  //           hidden: false,
  //           required: true,
  //           requiredHint: "",
  //           validation: "",
  //           validationHint: "",
  //           searchDialogWidth: "520px",
  //           customClass: [],
  //           labelIconClass: null,
  //           labelIconPosition: "rear",
  //           labelTooltip: null,
  //           prefixIcon: "",
  //           suffixIcon: "",
  //           buttonIcon: "Search",
  //           onCreated: "",
  //           onMounted: "",
  //           onChange: "",
  //           onValidate: "",
  //           onRecordSelected: "",
  //         },
  //         nameReadonly: true,
  //         id: "reference56917",
  //       },
  //       {
  //         type: "date",
  //         icon: "date-field",
  //         formItemFlag: true,
  //         options: {
  //           name: "modifiedOn",
  //           keyNameEnabled: false,
  //           keyName: "",
  //           label: "最近修改时间",
  //           labelAlign: "",
  //           type: "datetime",
  //           defaultValue: null,
  //           placeholder: "",
  //           columnWidth: "200px",
  //           size: "",
  //           autoFullWidth: true,
  //           labelWidth: null,
  //           labelHidden: false,
  //           labelWrap: false,
  //           readonly: false,
  //           disabled: false,
  //           hidden: false,
  //           clearable: true,
  //           editable: false,
  //           format: "YYYY-MM-DD HH:mm:ss",
  //           valueFormat: "YYYY-MM-DD HH:mm:ss",
  //           required: false,
  //           requiredHint: "",
  //           validation: "",
  //           validationHint: "",
  //           customClass: "",
  //           labelIconClass: null,
  //           labelIconPosition: "rear",
  //           labelTooltip: null,
  //           onCreated: "",
  //           onMounted: "",
  //           onChange: "",
  //           onFocus: "",
  //           onBlur: "",
  //           onValidate: "",
  //         },
  //         nameReadonly: true,
  //         id: "date77791",
  //       },
  //     ],
  //     formConfig: {
  //       modelName: "formData",
  //       refName: "vForm",
  //       rulesName: "rules",
  //       labelWidth: 80,
  //       labelPosition: "left",
  //       size: "",
  //       labelAlign: "label-left-align",
  //       cssCode: "",
  //       customClass: [],
  //       functions: "",
  //       layoutType: "PC",
  //       jsonVersion: 3,
  //       dataSources: [],
  //       onFormCreated: "",
  //       onFormMounted: "",
  //       onFormDataChange: "",
  //       onFormValidate: "",
  //     },
  //   };

  //   return "0000008-64639fd4f57c435b94e0832240e51a8d";
}

function createFormLayout(entityName, layoutName,layoutJson) {
  const entity = getEntityByNameCache(entityName)
  layoutName = layoutName || "默认表单布局"
  const formLayoutId = Process("models.formlayout.save", {
    layoutName: layoutName,
    layoutJson,
    entityCode: entity.entityCode,
    // formUploadParam: {
    //   cloudStorage: "false",
    //   cloudUploadToken: "",
    //   picUploadURL: "DSV['uploadServer'] + '/picture/upload'",
    //   fileUploadURL: "DSV['uploadServer'] + '/file/upload'",
    //   picDownloadPrefix: "/picture/get/",
    //   fileDownloadPrefix: "/file/get/",
    // },
  });
  return formLayoutId;
  //   layoutJson = {
  //     widgetList: [
  //       {
  //         type: "cascader",
  //         icon: "cascader-field",
  //         formItemFlag: true,
  //         options: {
  //           name: "area",
  //           keyNameEnabled: false,
  //           keyName: "",
  //           label: "area",
  //           labelAlign: "",
  //           defaultValue: "",
  //           placeholder: "",
  //           size: "",
  //           labelWidth: null,
  //           labelHidden: false,
  //           columnWidth: "200px",
  //           disabled: false,
  //           hidden: false,
  //           clearable: true,
  //           filterable: false,
  //           multiple: false,
  //           checkStrictly: false,
  //           showAllLevels: true,
  //           dsEnabled: false,
  //           dsName: "",
  //           dataSetName: "",
  //           labelKey: "label",
  //           valueKey: "value",
  //           childrenKey: "children",
  //           areaDataEnabled: true,
  //           areaDataType: 2,
  //           optionItems: [
  //             {
  //               label: "select 1",
  //               value: 1,
  //               children: [{ label: "child 1", value: 11 }],
  //             },
  //             { label: "select 2", value: 2 },
  //             { label: "select 3", value: 3 },
  //           ],
  //           required: false,
  //           requiredHint: "",
  //           customRule: "",
  //           customRuleHint: "",
  //           customClass: [],
  //           labelIconClass: null,
  //           labelIconPosition: "rear",
  //           labelTooltip: null,
  //           onCreated: "",
  //           onMounted: "",
  //           onChange: "",
  //           onFocus: "",
  //           onBlur: "",
  //           onValidate: "",
  //         },
  //         nameReadonly: true,
  //         optionItemsReadonly: true,
  //         id: "cascader106023",
  //       },
  //     ],
  //     formConfig: {
  //       modelName: "formData",
  //       refName: "vForm",
  //       rulesName: "rules",
  //       labelWidth: 80,
  //       labelPosition: "left",
  //       size: "",
  //       labelAlign: "label-left-align",
  //       cssCode: "",
  //       customClass: [],
  //       functions: "",
  //       layoutType: "PC",
  //       jsonVersion: 3,
  //       dataSources: [],
  //       onFormCreated: "",
  //       onFormMounted: "",
  //       onFormDataChange: "",
  //       onFormValidate: "",
  //     },
  //   };

  //   return "0000008-64639fd4f57c435b94e0832240e51a8d";
}
/**
 * get form layout
 *
 * yao run scripts.formlayout.getFormLayout 'Gongyingshangguanli'
 * @param {string} entityName
 * @returns
 */
function getFormLayout(entityName) {
  // const [entity] = Process("models.sys.entity.get", {
  //   select: ["name", "entityCode"],
  //   wheres: [
  //     {
  //       column: "name",
  //       value: entityName,
  //     },
  //   ],
  //   withs: {
  //     fieldSet: {
  //       query: {
  //         select: ["name", "tagList", "optionList"],
  //         wheres: [
  //           {
  //             column: "tagList",
  //             op: "notnull",
  //           },
  //           {
  //             column: "optionList",
  //             op: "notnull",
  //             method: "orwhere",
  //           },
  //         ],
  //       },
  //     },
  //   },
  // });
  const entity = getEntityByNameCache(entityName)
  if (!entity) {
    throw Error(`实体 ${entityName} 不存在`);
  }
  let optionData = {};
  let formLayout = {
    formLayoutId: null,
    layoutName: null,
    entityCode: null,
    layoutJson: null,
    createdOn: null,
    createdBy: null,
    modifiedOn: null,
    modifiedBy: null,
    optionData: {},
    entityRecord: {
      layoutJson: null,
    },
  };
  let [formLayout1] = Process("models.formlayout.get", {
    wheres: [
      {
        column: "entityCode",
        value: entity.entityCode,
      },
      {
        column: "layoutName",
        value: "默认表单布局",
      },
    ],
  });
  console.log("formLayout",formLayout1)
  if (formLayout1 != undefined) {
    formLayout = formLayout1;
  } else {
    entity.fieldSet &&
      entity.fieldSet.forEach((field) => {
        if (Array.isArray(field.optionList)) {
          optionData[field.name] = field.optionList;
        }else if (Array.isArray(field.tagList)) {
          optionData[field.name] = field.tagList.map(tag=>{
            return {
              value: tag.displayOrder,//需要转换值
              label: tag.label,
              displayOrder: tag.displayOrder,
            };
          });
        }
      });

    formLayout.formUploadParam = {
      cloudStorage: "false",
      cloudUploadToken: "",
      picUploadURL: "DSV['uploadServer'] + '/picture/upload'",
      fileUploadURL: "DSV['uploadServer'] + '/file/upload'",
      picDownloadPrefix: "/picture/get/",
      fileDownloadPrefix: "/file/get/",
    };
    // console.log("optionData",optionData)
    
  }
  return {
    ...formLayout,
    entityRecord: formLayout,
    optionData,
  };

  //   return {
  //     formLayoutId: "0000008-6182dacd9f344a0b959b0cc03f7f0791",
  //     layoutName: "默认表单布局",
  //     entityCode: 1252,
  //     layoutJson:
  //       '{"widgetList":[],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":[],"functions":"","layoutType":"PC","jsonVersion":3,"dataSources":[],"onFormCreated":"","onFormMounted":"","onFormDataChange":"","onFormValidate":""}}',
  //     createdOn: "2024-01-26 14:23:19",
  //     createdBy: "0000021-00000000000000000000000000000001",
  //     modifiedOn: "2024-01-26 14:23:19",
  //     modifiedBy: "0000021-00000000000000000000000000000001",
  //     optionData: {
  //       tag1: [
  //         {
  //           value: 1,
  //           label: "t1",
  //           displayOrder: 1,
  //         },
  //         {
  //           value: 2,
  //           label: "t2",
  //           displayOrder: 2,
  //         },
  //       ],
  //       o1: [
  //         {
  //           value: 1,
  //           label: "a1",
  //           displayOrder: 1,
  //         },
  //         {
  //           value: 2,
  //           label: "a2",
  //           displayOrder: 2,
  //         },
  //         {
  //           value: 3,
  //           label: "a3",
  //           displayOrder: 3,
  //         },
  //       ],
  //     },
  //     formUploadParam: {
  //       cloudStorage: "false",
  //       cloudUploadToken: "",
  //       picUploadURL: "DSV['uploadServer'] + '/picture/upload'",
  //       fileUploadURL: "DSV['uploadServer'] + '/file/upload'",
  //       picDownloadPrefix: "/picture/get/",
  //       fileDownloadPrefix: "/file/get/",
  //     },
  //     entityRecord: {
  //       modifiedOn: "2024-01-26 14:23:19",
  //       entityCode: 1252,
  //       formLayoutId: "0000008-6182dacd9f344a0b959b0cc03f7f0791",
  //       createdBy: "0000021-00000000000000000000000000000001",
  //       modifiedBy: "0000021-00000000000000000000000000000001",
  //       layoutJson:
  //         '{"widgetList":[],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":[],"functions":"","layoutType":"PC","jsonVersion":3,"dataSources":[],"onFormCreated":"","onFormMounted":"","onFormDataChange":"","onFormValidate":""}}',
  //       createdOn: "2024-01-26 14:23:19",
  //       layoutName: "默认表单布局",
  //     },
  //   };
}

function previewLayout(entity) {}

function updateName(layoutId, layoutName,{shareTo}){

}
function deleteLayout(layoutId){

}