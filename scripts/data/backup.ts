import { Process } from "@yao/runtime";

/**
 * backup the entity data to files
 * 
 * yao run scripts.data.backup.backup 'User'
 * 
 * @param {string|null} entityName 
 * @returns 
 */
function backup(entityName) {
  let entityList = Process("models.sys.entity.get", {
    select: ["name"],
    limit: 1000000,
  });
  entityList.push({
    name: "sys.entity",
  });
  entityList.push({
    name: "sys.entity.field",
  });

  if (entityName) {
    entityList = entityList.filter((entity) => entity.name === entityName);
  }

  entityList.forEach((entity) => {
    const entityName = entity.name;
    const data = Process(`models.${entityName}.get`, { limit: 100000 });
    if (data.length) {
      const fname = `/backup/${entityName}.json`;
      Process("fs.system.writeFile", fname, JSON.stringify(data));
      console.log(`Entity ${entityName} backuped`);
    }
  });
  return entityList;
}

/**
 * yao run scripts.data.backup.restore 'TagItem'
 * @param {string|null} entityName 
 * @returns 
 */
function restore(entityName) {
  const fileList = Process("fs.system.ReadDir", "/backup/");
  let entityList = fileList.map((f) => {
    const f1 = f.replace(/\\/g, "/");
    let entityName = f1
      .split("/")
      .slice(-1)[0]
      .split(".")
      .slice(0, -1)
      .join(".");
    return entityName;
  });

  if (entityName) {
    entityList = entityList.filter(item => item == entityName);
  }

  entityList.forEach((entityName) => {
    const fname = `/backup/${entityName}.json`;
    if (Process("fs.system.exists", fname)) {
      let entityContent = Process("fs.system.ReadFile", fname);
      entityContent = JSON.parse(entityContent);
      if (Array.isArray(entityContent)) {
        //will destroy table and recreate
        Process(`models.${entityName}.migrate`, true);
        var res = Process(`models.${entityName}.EachSave`, entityContent);

        if (res?.code && res.message) {
          throw Error(`${entityName}>>|Exception:${res?.code}|${res.message}`);
        }
        console.log(`Entity ${entityName} data restored`);
      }
    }
  });
  return entityList;
}
