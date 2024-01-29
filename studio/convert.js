const { entityToYaoModel } = Require("sys.yao");

/**
 * write the dsl file
 *
 * yao studio run convert.writeDslFile 'User'
 * @param {string} entitName
 */
function writeDslFile(entitName) {
  const dsl = entityToYaoModel(entitName);

  const dslFile = `/models/${entitName}.mod.yao`;

  let fs = new FS("dsl");
  const dslFileContent = JSON.stringify(dsl, null, 2);
  fs.WriteFile(dslFile, dslFileContent);
  // fs.WriteFile(dslFile, dsl);
  console.log(`write file:${dslFile}`);
}

/**
 * yao studio run convert.convertMetaModel 'User'
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