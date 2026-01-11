import { Process, Query } from "@yao/runtime";

//this is a script to copy the data from different database.

//从另外一个数据库中复制数据到当前数据库
//yao run scripts.tool.backup.copyTableData t_chart Chart
function copyTableData(source_table: string, targetModelId: string) {
  const query = new Query("mldb");
  const data = query.Get({
    sql: {
      stmt: `select * from ${source_table}`,
    },
    select: [],
  });

  try {
    const query2 = new Query();
    query2.Run({
      sql: {
        stmt: `delete from ${source_table}`,
        //   stmt: `truncate ${targetModelId.replaceAll(".", "_")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }

  const rows = Process(`models.${targetModelId}.eachsave`, data);

  console.log(`table ${source_table} copied success, total: ${rows.length}`);
}

//yao run scripts.tool.backup.copyAllTableData
export function copyAllTableData() {
  const query = new Query("mldb");

  const data = query.Get({
    sql: {
      stmt: `SHOW TABLES;`,
    },
  });

  const tableList = data.reduce((prev, curr) => {
    prev.push(curr[Object.keys(curr)[0]]);
    return prev;
  }, []);
  console.log(tableList);

  const modelList = Process("model.list") as [];
  //delete t_meta_field,t_meta_entity from tableList
  tableList.splice(
    tableList.findIndex((tab) => tab === "t_meta_field"),
    1
  );
  tableList.splice(
    tableList.findIndex((tab) => tab === "t_meta_entity"),
    1
  );

  tableList.forEach((tab) => {
    const model = modelList.find((model) => {
      return model.table.name == tab;
    });
    if (model?.id) {
      copyTableData(tab, model.id);
    } else {
      console.log(`${tab} not found in model`);
    }
  });
}
