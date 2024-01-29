// function getLoginUser() {
//   return { code: 403, error: "请登录", message: "用户未登录", data: "" };
// }
function avatar(userId) {}
function logout() {}
function getLoginUser() {
  return {
    departmentName: "公司总部",
    mobilePhone: "15215478481",
    loginName: "admin",
    departmentId: "0000022-00000000000000000000000000000001",
    jobTitle: 1,
    userName: "系统管理员",
    userId: "0000021-00000000000000000000000000000001",
    ownerTeam: [
      "0000024-4282ab63811645c483d1bff3318a013a",
      "0000024-4f7cba893f494d699c519b19177b726a",
    ],
    email: "",
  };
}
function listUser(entity) {
  return [
    {
      userName: "系统管理员",
      userId: "0000021-00000000000000000000000000000001",
    },
    {
      userName: "gaoyuhui",
      userId: "0000021-2909a29a118a4a28b294cd410b460751",
    },
    {
      userName: "体验",
      userId: "0000021-4ad8495b30304b4b944afcbf748d982a",
    },
  ];
}
function getRoleData(roleId) {}
function deleteUser(userId) {
  return { code: 200, error: null, message: "success", data: true };
  return { code: 201, error: "系统管理员不能删除!", message: null, data: null };
}
function saveUser(formModel, entity, idstr) {
  // const formModel = { "userName": "体验", "departmentId": { "id": "0000022-00000000000000000000000000000001", "name": "公司总部" }, "jobTitle": { "value": 1, "label": "员工", "displayOrder": 5 }, "disabled": false, "mobilePhone": "", "email": "", "loginName": "tiyan", "loginPwd": "d97085db8d45c1f291879688dddba8df", "avatar": null }
  // const entity = "User"
  // const id = "0000021-4ad8495b30304b4b944afcbf748d982a"
  // formModel = {
  //   userName: "a1",
  //   departmentId: { id: "22-5", name: "A1" },
  //   jobTitle: 3,
  //   disabled: false,
  //   mobilePhone: "",
  //   email: "",
  //   loginName: "a1",
  //   loginPwd: "123456",
  //   avatar: null,
  // };
  if (idstr) {
    const [entityCode,id] = idstr.split("-")
    formModel.userId = id;
  }
  if (formModel.departmentId && typeof formModel.departmentId === 'object' ) {
    const [entityCode,id] = formModel.departmentId.id.split("-")
    formModel.departmentId = id;
  }

 const userId = Process('models.user.save',formModel)
  // /saveUser?entity=User
  const userData = Process('models.user.find',userId,{})

  return {
    layoutJson: null,
    fieldPropsMap: null,
    formData: userData,
    // {
    //   loginPwd: "d97085db8d45c1f291879688dddba8df",
    //   departmentId: "0000022-00000000000000000000000000000001",
    //   jobTitle: 1,
    //   roles: ["0000023-6fba2dd4dbbd41dc881801f3b3580675"],
    //   aaaaaa: null,
    //   avatar: null,
    //   userName: "体验",
    //   userId: "0000021-4ad8495b30304b4b944afcbf748d982a",
    //   createdOn: "2024-01-05 14:29:43",
    //   xsxs: null,
    //   modifiedOn: "2024-01-25 18:03:03",
    //   ownerUser: "0000021-4ad8495b30304b4b944afcbf748d982a",
    //   ownerDepartment: "0000022-00000000000000000000000000000001",
    //   mobilePhone: "",
    //   createdBy: "0000021-00ec15ca45bc446f9fc36161281733d4",
    //   loginName: "tiyan",
    //   modifiedBy: "0000021-00000000000000000000000000000001",
    //   disabled: false,
    //   dingTalkUserId: null,
    //   ownerTeam: null,
    //   email: "",
    //   tatp: null,
    // },
    labelData: null,
    deletedFields: null,
  };
}

function login(payload) {
  // http://web1.demo.melecode.com/user/login
  // {user: "admin", password: "admin"}
  return {
    departmentName: "公司总部",
    mobilePhone: "15215478481",
    departmentId: "0000022-00000000000000000000000000000001",
    jobTitle: 1,
    disabled: false,
    userName: "系统管理员",
    userId: "0000021-00000000000000000000000000000001",
    ownerTeam: [
      "0000024-4282ab63811645c483d1bff3318a013a",
      "0000024-4f7cba893f494d699c519b19177b726a",
    ],
    email: "",
  };
}

function updateLoginUser(formModel, id) {}
function addUserRole(body) {}
function getUserRole(userId) {}

/**
 *
 * @param {*} id  实体记录ID
 * @param {*} rightType 权限类型  2新建 3更新 4删除 5分配 6分享
 * @param {*} entityName 实体Name
 * @returns
 */
function checkRight(id, rightType, entityName) {
  return true;
}

function getRightMap() {
  //todo根据用户信息进行权限信息处理。

  let rightMap = {
    r6000: true,
    r6001: true,
    r6002: true,
    r6003: true,
    r6005: true,
    r6006: true,
    r6007: true,
    r6008: true,
    r6009: true,
    r6010: true,
    r6011: true,
    r6013: true,
    r6014: true,
    r6015: true, //触发器日志
    r6016: true,
    r6017: true,
  };

  const codelist = Process("models.sys.entity.get", {
    select: ["entityCode"],
    limit: 10000,
  });
  //21 用户管理 User
  //22 部门管理 Department
  //23 权限角色 Role
  //24 团队管理 Team
  //30 审批流程
  //45 报表设计
  //48 触发器列表
  //52 仪表盘

  [21, 22, 23, 24, 30, 45, 48, 52].forEach((n) => {
    codelist.push({
      entityCode: n,
    });
  });

  //操作：
  //1 查看权限
  //2 新建权限
  //3 修改权限
  //4 删除权限
  //5 分配权限
  //6 共享权限

  codelist.forEach((entity) => {
    rightMap[`r${entity.entityCode}-1`] = 50;
    rightMap[`r${entity.entityCode}-2`] = 50;
    rightMap[`r${entity.entityCode}-3`] = 50;
    rightMap[`r${entity.entityCode}-4`] = 50;
    rightMap[`r${entity.entityCode}-5`] = 50;
    rightMap[`r${entity.entityCode}-6`] = 50;
  });

  return rightMap;
}
