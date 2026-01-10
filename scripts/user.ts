// function getLoginUser() {
//   return { code: 403, error: "请登录", message: "用户未登录", data: "" };
// }

import { Process } from "@yao/runtime";
import { getEntityByNameCache, newUUID } from "./sys/lib";
import { saveCurdRecord } from "./curd";

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
function getLoginUser(loginToken) {
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
function listUser() {
  return Process("models.user.get", {
    select: ["userId", "userName"],
    limit: 10000,
  });
}
function getRoleData(roleId) {}
function deleteUser(userId) {
  // const [entityCode, id] = userId.split("-");
  if (userId === "00000000000000000000000000000001") {
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
  return saveCurdRecord(entityName, idstr, formModel);
}

/**
 * 用户登录
 * yao run scripts.user.login '::{"user":"admin","password":"admin"}'
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
  // const userEntity = getEntityByNameCache("User");

  Process("utils.pwd.Verify", password, userData.loginPwd);

  let departmentName = "";
  let departmentId = "";
  if (userData.departmentId) {
    // const departEntity = getEntityByNameCache("Department");
    const [dep] = Process("models.Department.get", {
      wheres: [
        {
          column: "departmentId",
          value: userData.departmentId,
        },
      ],
    });
    if (dep) {
      departmentName = dep.name;
    }
    departmentId = userData.departmentId;
  }
  const teams = Process("models.team.get", {
    wheres: [{ column: "ownerUser", value: userData.userId }],
  });

  // const teamEntity = getEntityByNameCache("Team");

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
  const jwt = Process("utils.jwt.Make", userData.userId, jwtClaims, jwtOptions);

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
  Process("models.user.update", idStr, formModel);
}

function addUserRole(body) {

  Process("models.ReferenceListMap.deletewhere", {
    wheres: [
      {
        column: "objectId",
        value: body.id,
      },
      {
        column: "fieldName",
        value: "roles",
      },
    ],
  });
  const mapEntity = getEntityByNameCache("ReferenceListMap");
  const data = body.nodeRoleList.reduce((list, role) => {
    list.push({
      mapId: newUUID(mapEntity.entityCode),
      entityName: "User",
      fieldName: "roles",
      objectId: body.id, //用户id
      toId: role.id, //角色ID
    });
    return list;
  }, []);
  Process("models.ReferenceListMap.eachsave", data);
}
function getUserRole(userId) {
  const roleList = Process("models.ReferenceListMap.get", {
    wheres: [
      {
        column: "entityName",
        value: "User",
      },
      {
        column: "fieldName",
        value: "roles",
      },
      {
        column: "objectId",
        value: userId,
      },
    ],
  });

  return roleList.reduce((list, r) => {
    const [role] = Process("models.role.get", {
      wheres: [
        {
          column: "roleId",
          value: r.toId,
        },
      ],
    });
    list.push({
      roleId: role.roleId,
      roleName: role.roleName,
      description: role.description,
    });
    return list;
  }, []);
}

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

  const userId = Process("session.get", "user_id");

  if (userId == "0000021-00000000000000000000000000000001") {
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

    const codelist = Process("models.meta.entity.get", {
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
  const roleList = Process("models.ReferenceListMap.get", {
    wheres: [
      {
        column: "entityName",
        value: "User",
      },
      {
        column: "fieldName",
        value: "roles",
      },
      {
        column: "objectId",
        value: userId,
      },
    ],
  });

  return roleList.reduce((obj, r) => {
    const [role] = Process("models.role.get", {
      wheres: [
        {
          column: "roleId",
          value: r.toId,
        },
      ],
    });
    Object.assign(obj, JSON.parse(role.rightJson));
    return obj;
  }, {});
}

function delTeamOrRoleUsersUser(id, userId) {
  const [entityCode, _] = id.split("-");
  const mapEntity = getEntityByNameCache("Role");
  if (userId == "0000021-00000000000000000000000000000001") {
    throw Error("管理员的权限请不要删除");
   
  }
  let fieldName = "ownerTeam";
  // console.log("entityCode == mapEntity.entityCode",entityCode,mapEntity.entityCode)
  if (entityCode == mapEntity.entityCode) {
    fieldName = "roles";
  }
  Process("models.ReferenceListMap.deletewhere", {
    wheres: [
      {
        column: "objectId",
        value: userId,
      },
      {
        column: "fieldName",
        value: fieldName,
      },
    ],
  });
}

function removeDuplicates(stringArray) {
  // The Set object lets you store unique values of any type, whether primitive values or object references.
  const uniqueSet = new Set(stringArray);

  // Spread operator (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
  const uniqueArray = [...uniqueSet];

  return uniqueArray;
}

function teamOrRoleUsers(id) {
  
  // id = 0000024-3ce6b92d5b304babb6a8226ffe9360bd
  const data = Process("models.ReferenceListMap.get", {
    select: ["objectId"],
    wheres: [
      {
        column: "toId",
        value: id,
      },
      {
        column: "entityName",
        value: "User",
      },
      {
        column: "fieldName",
        op: "in",
        value: ["roles", "ownerTeam"],
      },
    ],
    limit: 10000,
  });
  console.log("data",data)
  const userIds = removeDuplicates(data.map((f) => f.objectId));
  return userIds.map((u) => {
    const [userData] = Process("models.user.get", {
      select:["userId","userName","avatar"],
      wheres: [
        {
          column: "userId",
          value: u,
        },
      ],
    });
    if (userData.avatar) {
      userData.userAvatar = JSON.parse(userData.avatar)
      delete userData.avatar;
    }
   
    userData.roleIds = Process("models.ReferenceListMap.get", {
      wheres: [
        {
          column: "entityName",
          value: "User",
        },
        {
          column: "fieldName",
          value: "roles",
        },
        {
          column: "objectId",
          value: u,
        },
      ],
    }).map((f) => f.toId);

    userData.teamIds = Process("models.ReferenceListMap.get", {
      wheres: [
        {
          column: "entityName",
          value: "User",
        },
        {
          column: "fieldName",
          value: "ownerTeam",
        },
        {
          column: "objectId",
          value: u,
        },
      ],
    }).map((f) => f.toId);
    return userData;
  });

  // return [
  //   {
  //     userId: "0000021-00000000000000000000000000000001",
  //     userName: "系统管理员",
  //     teamIds: [
  //       "0000024-4282ab63811645c483d1bff3318a013a",
  //       "0000024-4f7cba893f494d699c519b19177b726a",
  //     ],
  //     roleIds: ["0000023-00000000000000000000000000000001"],
  //     departmentName: "公司总部",
  //     userAvatar: null,
  //   },
  // ];
}

// 添加团队成员
function addTeamOrRoleUsers(body) {
  Process("models.ReferenceListMap.deletewhere", {
    wheres: [
      {
        column: "objectId",
        value: body.id,
      },
      {
        column: "fieldName",
        value: "ownerTeam",
      },
    ],
  });
  const mapEntity = getEntityByNameCache("ReferenceListMap");
  const data = body.nodeRoleList.reduce((list, user) => {
    list.push({
      mapId: newUUID(mapEntity.entityCode),
      entityName: "User",
      fieldName: "ownerTeam",
      objectId: user.id, //用户id
      toId: body.id, //team ID
    });
    return list;
  }, []);
  Process("models.ReferenceListMap.eachsave", data);
}
