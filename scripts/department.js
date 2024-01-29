const { getEntityByName, getEntityByCode } = Require("sys.lib");



// yao run scripts.department.treeData
function treeData() {
  let items = Process(`models.Department.get`, {});
  if (items.length == 0) {
    Process(`models.Department.create`, { departmentName: "公司总部" });
  }
  items = Process(`models.Department.get`, {});

  const convertData = items.map((item) => {
    return {
      id: item.departmentId,
      label: item.departmentName,
      parentId: item.parentDepartmentId,
    };
  });
  // console.log(convertData);
  const tree = Process(`utils.arr.Tree`, convertData, {
    parent: "parentId",
    empty: null,
    key: "id",
  });
  // console.log(tree);

  return tree;
  // return [
  //   {
  //     children: [
  //       {
  //         children: [
  //           {
  //             children: [],
  //             dingDepartmentId: null,
  //             id: "0000022-5c081c8aca3b4f18a3e7ced7f81eb0cb",
  //             label: "22",
  //           },
  //         ],
  //         dingDepartmentId: null,
  //         id: "0000022-8b698fea6842441d8aafc0d5ba395401",
  //         label: "11",
  //       },
  //     ],
  //     dingDepartmentId: null,
  //     id: "0000022-00000000000000000000000000000001",
  //     label: "公司总部",
  //     parentId: null,
  //   },
  // ];
}
function saveDepartment(formModel, entity, id) {
  //  /saveDepartment?entity=Department&id=
  // const {
  //   departmentName,
  //   parentDepartmentId,
  //   departmentOwnerUser,
  //   description,
  // } = formModel;
  // const data = {
  //   departmentName: "a1",
  //   parentDepartmentId: { id: 4, name: "公司总部" },
  //   departmentOwnerUser: null,
  //   description: "fffffffffffffffffffff",
  // };

  let obj = {
    ...formModel
  };
  if (obj.parentDepartmentId && typeof obj.parentDepartmentId === 'object') {
    obj.parentDepartmentId = obj.parentDepartmentId.id
  }
  if (id) {
    obj.departmentId = id;
  }
  Process(`models.Department.save`,obj);
}

function deleteDepartment(departmentId) {
  let subItems = [];
  let item = Process(`models.Department.find`, departmentId, null);
  if (item?.departmentId) {
    subItems = subItems.concat(getSubNodeItems(item.departmentId));
    subItems.push(item); //删除自己
  }
  subItems.forEach((item) => {
    Process(`models.Department.delete`, item.departmentId);
  });
  return true;
}
/**
 * 读取一个所有根节点
 * @param {integer} parentId,父节点部门id
 * @returns 所有的部门节点列表
 */
function getSubNodeItems(parentId) {
  let subNodes = Process(`models.Department.get`, {
    wheres: [
      {
        column: "parentDepartmentId",
        value: parentId,
      },
    ],
  });
  let subItems = [];

  subNodes.map((node) => {
    subItems.push(node);
    subItems = subItems.concat(getSubNodeItems(node.id));
  });

  return subItems;
}

function listDepartment(entityName) {
  const data = Process("models.department.get",{limit:10000})

  const entity = getEntityByName(entityName)
  data.forEach(line=>{
    line.departmentId = `${entity.entityCode}-${line.departmentId}`
    if (line.parentDepartmentId) {
      line.parentDepartmentId = `${entity.entityCode}-${line.parentDepartmentId}`
    }
  })
  // return [
  //   {
  //     departmentName: "公司总部",
  //     parentDepartmentId: null,
  //     departmentId: "0000022-00000000000000000000000000000001",
  //     departmentOwnerUser: null,
  //   },
  //   {
  //     departmentName: "11",
  //     parentDepartmentId: "0000022-00000000000000000000000000000001",
  //     departmentId: "0000022-8b698fea6842441d8aafc0d5ba395401",
  //     departmentOwnerUser: null,
  //   },
  //   {
  //     departmentName: "22",
  //     parentDepartmentId: "0000022-8b698fea6842441d8aafc0d5ba395401",
  //     departmentId: "0000022-5c081c8aca3b4f18a3e7ced7f81eb0cb",
  //     departmentOwnerUser: null,
  //   },
  // ];
  return data;
}
