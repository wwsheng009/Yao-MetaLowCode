import { Process } from "@yao/runtime";

function getEntityList(reportConfigId) {
  const [entityCode, id] = reportConfigId.split("-");

  const row = Process("models.sys.entity.find", entityCode, {
    select: ["label"],
    withs: {
      fieldSet: {
        query: {
          select: ["code", "name", "type"],
        },
      },
    },
  });
  if (row == null) {
    throw new Error(`实体 ${entity} 不存在`);
  }
  return [
    {
      label: row.label,
      fieldList: row.fieldSet,
    },
  ];

}
function getEntityCode() {}
