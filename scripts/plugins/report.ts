import { entityCodeInput } from "@scripts/sys/lib";
import { Process } from "@yao/runtime";

function getEntityList(reportConfigId) {
  const [entityCode, id] = reportConfigId.split("-");

  const [row] = Process("models.meta.entity.get", {
    wheres: [{ column: "entityCode", value: entityCodeInput(entityCode) }],
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
