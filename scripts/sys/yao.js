

function loadEntityToYao(entityName){
    const yaoModel = entityToYaoModel(entityName)
    loadYaoModel(yaoModel)
}
function updateEntityToYao(entityName){
   const yaoModel = entityToYaoModel(entityName)
   loadYaoModel(yaoModel)
   migrateYaoModel(yaoModel)
}

/**
 * convert entity to yao model
 * 
 * yao run scripts.yao.entityToYaoModel 'Entity1'
 * @param {string} entityName 
 */
function entityToYaoModel(entityName){
    const [entity] = Process("models.sys.entity.get", {
        wheres: [{ column: "name", value: entityName }],
        withs:{
            fields:{}
        }
      });
    
    if (!entity) {
        throw Error(`Entity:${entityName} not exist`)
    }

    let yaoModel = {
        name:entity.name,
        table:{
            name:entity.physicalName
        },
        columns:entity.fields.map(field=>getYaoColumnFromField(field))
    }
    
    return yaoModel
}

function getYaoColumnFromField(field){
    let column = {
        "comment": field.label,
        "label": field.label,
        "name": field.name,
    };

    // Boolean/Text/Email/Url/Password/TextArea/Integer
    // Decimal/Percent/Money/Date/DateTime
    // Option
    // MultiOption
    // Status
    // Tag
    // Picture
    // File
    // AreaSelect
    // Reference
    // AnyReference
    // ReferenceList
    
    column.nullable = true;
    switch (field.type) {
        case 'PrimaryKey':
            column.type = 'id'
            column.primary = true;
            break;
        case 'Text','Email','Url','Picture','File':
            column.type = 'String'
            break;
        case 'TextArea':
            column.type = 'longtext'
            break;
        case 'Integer':
            column.type = 'integer'
            break;
        case 'Decimal':
            column.type = 'decimal'
            column.precision = field.fieldViewModel.precision
            break;
        case 'Money':
            column.type = 'decimal'
            column.precision = field.fieldViewModel.precision
            break;
        case 'Percent':
            column.type = 'float'
            break;
        case 'Password':
            column.type = 'password'
            break;
        case 'Option','MultiOption':
            column.type = 'Enum'
            column.option = field.optionList.map(f=>f.key)
            break;
        case 'Tag':
            column.type = 'Enum'
            column.option = field.tagList
            break;
        case 'Boolean':
            column.type = 'boolean'
            break;
        case 'Date':
            column.type = 'date'
            break;
        case 'DateTime':
            column.type = 'datetime'
            break;
        case 'Reference'://暂时这样处理
            column.type = 'string'
            break
        case 'AreaSelect':
            column.type = 'json'
            break
        default:
            column.type = 'string'
            break;
    }
    if (field.nullable) {
        column.nullable = true;
    }
    if (field.default) {
        column.default = field.default;
    }
    if (field.description) {
        column.comment = field.description;
    }
    if (field.unique) {
        column.unique = true;
    }
    if (field.index) {
        column.index = true;
    }
    if (field.length) {
        column.length = field.length;
    }
    
    // if (field.scale) {
    //     column.scale = field.scale;
    // }

    return column
}
function loadYaoModel(model){
    const modelId = model.name;
    const fname = `${modelId}.mod.json`;
    let err = Process(
        `models.${modelId}.load`,
        fname,
        JSON.stringify(model)
    );
    if (err?.code && err?.message) {
        throw new Exception(
            `Message:${err.message},Number:${err.code}`,500
        );
    }
}

function migrateYaoModel(model){
    // console.log("modelYao", modelYao);
    const modelId = model.name;
   
    let err = Process(`models.${modelId}.migrate`, true);
    // console.log("migrate err:", err);
    if (err?.Message && err?.Number) {
        const sqlStateString = bytesToString(err.SQLState);

        throw new Exception(
            `Message:${err.Message},Number:${err.Number},SQLState:${sqlStateString}`,
            500
        );
    }
}

module.exports = {
    loadEntityToYao,
    updateEntityToYao
}