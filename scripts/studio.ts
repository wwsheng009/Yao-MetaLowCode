import { entityToYaoModel, entityToYaoModelByName } from "@scripts/sys/entity";
import { FS, Process } from "@yao/runtime";

/**
 * write the dsl file
 *
 * yao run scripts.studio.writeDslFile 'User'
 * @param {string} entitName
 */
function writeDslFile(entitName) {
  const dsl = entityToYaoModelByName(entitName);

  const dslFile = `/models/${entitName}.mod.yao`;

  let fs = new FS("app");
  const dslFileContent = JSON.stringify(dsl, null, 2);
  fs.WriteFile(dslFile, dslFileContent);
  // fs.WriteFile(dslFile, dsl);
  console.log(`write file:${dslFile}`);
}

/**
 * yao scripts.studio.convertMetaModel 'User'
 * @param {string|null} entityName 
 * @returns 
 */
function convertMetaModel(entityName){
  if (entityName) {
    writeDslFile(entityName)
    return
  }

  const entityList =  Process("models.sys.entity.get",{
    select:["name"],
    limit:10000,
  })
  entityList.forEach(entity => {
    writeDslFile(entity.name)
  });
}

//yao run scripts.studio.convertMLModelToYaoModels
function convertMLModelToYaoModels(){
  const fileList = Process("fs.system.ReadDir", "/entitys/");
  for (const f of fileList) {
    let entityContents = Process("fs.system.ReadFile", f);
    const entity = JSON.parse(entityContents);

    const yaoModel = entityToYaoModel(entity);
    const dslFile = `/models/${entity.name}.mod.yao`;

    let fs = new FS("app");
    const dslFileContent = JSON.stringify(yaoModel, null, 2);
    fs.WriteFile(dslFile, dslFileContent);
    // fs.WriteFile(dslFile, dsl);
    console.log(`write file:${dslFile}`);
  }
}