function treeData() {
  return [
    {
      children: [
        {
          children: [
            {
              children: [],
              dingDepartmentId: null,
              id: "0000022-5c081c8aca3b4f18a3e7ced7f81eb0cb",
              label: "22",
            },
          ],
          dingDepartmentId: null,
          id: "0000022-8b698fea6842441d8aafc0d5ba395401",
          label: "11",
        },
      ],
      dingDepartmentId: null,
      id: "0000022-00000000000000000000000000000001",
      label: "公司总部",
      parentId: null,
    },
  ];
}
function saveDepartment(formModel, entity, id) {}

function deleteDepartment(departmentId) {}

function listDepartment(entity) {
  return [
    {
      departmentName: "公司总部",
      parentDepartmentId: null,
      departmentId: "0000022-00000000000000000000000000000001",
      departmentOwnerUser: null,
    },
    {
      departmentName: "11",
      parentDepartmentId: "0000022-00000000000000000000000000000001",
      departmentId: "0000022-8b698fea6842441d8aafc0d5ba395401",
      departmentOwnerUser: null,
    },
    {
      departmentName: "22",
      parentDepartmentId: "0000022-8b698fea6842441d8aafc0d5ba395401",
      departmentId: "0000022-5c081c8aca3b4f18a3e7ced7f81eb0cb",
      departmentOwnerUser: null,
    },
  ];
}
