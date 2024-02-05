// function getLoginUser() {
//   return { code: 403, error: "请登录", message: "用户未登录", data: "" };
// }
const { getEntityByNameCache, getEntityByCodeCache } = Require("sys.lib");

function getFilePath(userId) {
  let idstr = userId;
  const [user] = Process("models.user.get", {
    wheres: [
      {
        column: "userId",
        value: idstr,
      },
    ],
  });
  if (user?.avatar) {
    const url = user.avatar[0]?.url;
    if (url) {
      const fname = url.split("=")[1];
      return `/upload/${fname}`;
    }
  }
  throw Error(`用户:${idstr}头像未设置`);
}
function logout() {}
function getLoginUser() {
  return Process("session.get", "user");
  // return {
  //   departmentName: "公司总部",
  //   mobilePhone: "15215478481",
  //   loginName: "admin",
  //   departmentId: "0000022-00000000000000000000000000000001",
  //   jobTitle: 1,
  //   userName: "系统管理员",
  //   userId: "21-1",
  //   ownerTeam: [],
  //   email: "",
  // };
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
  // const [entityCode, id] = userId.split("-");
  if (userId === "0000021-00000000000000000000000000000001") {
    throw Error(`系统管理员不能删除!`);
  }
  Process("models.User.deletewhere", {
    wheres: [
      {
        column: "userId",
        value: userId,
      },
    ],
  });

  return { code: 200, error: null, message: "success", data: true };
  return { code: 201, error: "系统管理员不能删除!", message: null, data: null };
}
function saveUser(formModel, entityName, idstr) {
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
  return Process("scripts.curd.saveRecord", entityName, idstr, formModel);
}

/**
 * 用户登录
 * @param {object} payload
 * @returns
 */
function login(payload) {
  // http://web1.demo.melecode.com/user/login
  // {user: "admin", password: "admin"}

  // {"user":"admin","password":"admin"}

  const { user, password } = payload;

  const [userData] = Process("models.user.get", {
    wheres: [
      {
        column: "loginName",
        value: user,
      },
    ],
  });
  if (!userData) {
    throw Error(`用户不存在：${user}`);
  }
  const userEntity = getEntityByNameCache("User");

  Process("utils.pwd.Verify", password, userData.loginPwd);

  let departmentName = "";
  let departmentId = "";
  if (userData.departmentId) {
    const departEntity = getEntityByNameCache("Department");
    departmentName = Process(
      "models.Department.find",
      userData.departmentId
    )?.name;
    departmentId = userData.departmentId;
  }
  const teams = Process("models.team.get", {
    wheres: [{ column: "ownerUser", value: userData.userId }],
  });

  const teamEntity = getEntityByNameCache("Team");

  const timeout = 60 * 60 * 8;
  const sessionId = Process("utils.str.UUID");
  // let userPayload = { ...userData };

  // delete userPayload.loginPwd;
  const jwtOptions = {
    timeout: timeout,
    sid: sessionId,
  };
  const jwtClaims = { user_name: user.name };
  //需要注意的是在这里无法生成studio的token,因为这个处理器只接受3个参数，
  //而生成studio的token需要在第4个参数里传入secretkey
  const jwt = Process("utils.jwt.Make", userData.autoId, jwtClaims, jwtOptions);

  const userPayload = {
    departmentName: departmentName,
    mobilePhone: userData.mobilePhone,
    departmentId: departmentId,
    jobTitle: userData.jobTitle,
    disabled: userData.disabled,
    userName: userData.userName,
    userId: userData.userId,
    ownerTeam: teams,
    email: userData.email,
    token: jwt.token,
    expires_at: jwt.expires_at,
  };

  Process("session.set", "user", userPayload, timeout, sessionId);
  Process("session.set", "token", jwt.token, timeout, sessionId);
  Process("session.set", "user_id", userData.userId, timeout, sessionId);

  return userPayload;
}

function updateLoginUser(formModel, idStr) {
  // console.log("updateLoginUser", formModel, idStr);
  if (formModel.avatar) {
    formModel.avatar = JSON.parse(formModel.avatar);
  }
  // const [_, id] = idStr.split("-");
  const [{ autoId }] = Process("models.user.get", {
    wheres: [
      {
        column: "userId",
        value: idStr,
      },
    ],
  });
  Process("models.user.update", autoId, formModel);
}

function addUserRole(body) {
  // body = { id: "21-1", nodeRoleList: [{ name: "test", id: "23-1" }] };
  // const [entityCode, id] = body.id.split("-");
  const [{ autoId }] = Process("models.user.get", {
    wheres: [
      {
        column: "userId",
        value: body.id,
      },
    ],
  });

  Process("models.user.update", autoId, { roles: body.nodeRoleList });
}
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

  const user_id = Process("session.get", "user_id");

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
