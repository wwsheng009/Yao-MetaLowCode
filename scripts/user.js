// function getLoginUser() {
//   return { code: 403, error: "请登录", message: "用户未登录", data: "" };
// }
function avatar(userId) {
  
}
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
function saveUser(formModel, entity, id) {
  // const formModel = { "userName": "体验", "departmentId": { "id": "0000022-00000000000000000000000000000001", "name": "公司总部" }, "jobTitle": { "value": 1, "label": "员工", "displayOrder": 5 }, "disabled": false, "mobilePhone": "", "email": "", "loginName": "tiyan", "loginPwd": "d97085db8d45c1f291879688dddba8df", "avatar": null }
  // const entity = "User"
  // const id = "0000021-4ad8495b30304b4b944afcbf748d982a"

  return {
    layoutJson: null,
    fieldPropsMap: null,
    formData: {
      loginPwd: "d97085db8d45c1f291879688dddba8df",
      departmentId: "0000022-00000000000000000000000000000001",
      jobTitle: 1,
      roles: ["0000023-6fba2dd4dbbd41dc881801f3b3580675"],
      aaaaaa: null,
      avatar: null,
      userName: "体验",
      userId: "0000021-4ad8495b30304b4b944afcbf748d982a",
      createdOn: "2024-01-05 14:29:43",
      xsxs: null,
      modifiedOn: "2024-01-25 18:03:03",
      ownerUser: "0000021-4ad8495b30304b4b944afcbf748d982a",
      ownerDepartment: "0000022-00000000000000000000000000000001",
      mobilePhone: "",
      createdBy: "0000021-00ec15ca45bc446f9fc36161281733d4",
      loginName: "tiyan",
      modifiedBy: "0000021-00000000000000000000000000000001",
      disabled: false,
      dingTalkUserId: null,
      ownerTeam: null,
      email: "",
      tatp: null,
    },
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
  return true
}

function getRightMap() {
  return {
    "r21-1": 50,
    "r21-2": 50,
    "r21-3": 50,
    "r21-4": 50,
    "r21-5": 50,
    "r21-6": 50,
    "r22-1": 50,
    "r22-2": 50,
    "r22-3": 50,
    "r22-4": 50,
    "r22-5": 50,
    "r22-6": 50,
    "r23-1": 50,
    "r23-2": 50,
    "r23-3": 50,
    "r23-4": 50,
    "r23-5": 50,
    "r23-6": 50,
    "r24-1": 50,
    "r24-2": 50,
    "r24-3": 50,
    "r24-4": 50,
    "r24-5": 50,
    "r24-6": 50,
    "r30-1": 50,
    "r30-2": 50,
    "r30-3": 50,
    "r30-4": 50,
    "r30-5": 50,
    "r30-6": 50,
    "r45-1": 50,
    "r45-2": 50,
    "r45-3": 50,
    "r45-4": 50,
    "r45-5": 50,
    "r45-6": 50,
    "r48-1": 50,
    "r48-2": 50,
    "r48-3": 50,
    "r48-4": 50,
    "r48-5": 50,
    "r48-6": 50,
    "r51-1": 50,
    "r51-2": 50,
    "r51-3": 50,
    "r51-4": 50,
    "r51-5": 50,
    "r51-6": 50,
    "r52-1": 50,
    "r52-2": 50,
    "r52-3": 50,
    "r52-4": 50,
    "r52-5": 50,
    "r52-6": 50,
    "r54-1": 50,
    "r54-2": 50,
    "r54-3": 50,
    "r54-4": 50,
    "r54-5": 50,
    "r54-6": 50,
    "r55-1": 50,
    "r55-2": 50,
    "r55-3": 50,
    "r55-4": 50,
    "r55-5": 50,
    "r55-6": 50,
    "r1001-1": 50,
    "r1001-2": 50,
    "r1001-3": 50,
    "r1001-4": 50,
    "r1001-5": 50,
    "r1001-6": 50,
    "r1002-1": 50,
    "r1002-2": 50,
    "r1002-3": 50,
    "r1002-4": 50,
    "r1002-5": 50,
    "r1002-6": 50,
    "r1006-1": 50,
    "r1006-2": 50,
    "r1006-3": 50,
    "r1006-4": 50,
    "r1006-5": 50,
    "r1006-6": 50,
    "r1008-1": 50,
    "r1008-2": 50,
    "r1008-3": 50,
    "r1008-4": 50,
    "r1008-5": 50,
    "r1008-6": 50,
    "r1010-1": 50,
    "r1010-2": 50,
    "r1010-3": 50,
    "r1010-4": 50,
    "r1010-5": 50,
    "r1010-6": 50,
    "r1012-1": 50,
    "r1012-2": 50,
    "r1012-3": 50,
    "r1012-4": 50,
    "r1012-5": 50,
    "r1012-6": 50,
    "r1013-1": 50,
    "r1013-2": 50,
    "r1013-3": 50,
    "r1013-4": 50,
    "r1013-5": 50,
    "r1013-6": 50,
    "r1017-1": 50,
    "r1017-2": 50,
    "r1017-3": 50,
    "r1017-4": 50,
    "r1017-5": 50,
    "r1017-6": 50,
    "r1018-1": 50,
    "r1018-2": 50,
    "r1018-3": 50,
    "r1018-4": 50,
    "r1018-5": 50,
    "r1018-6": 50,
    "r1020-1": 50,
    "r1020-2": 50,
    "r1020-3": 50,
    "r1020-4": 50,
    "r1020-5": 50,
    "r1020-6": 50,
    "r1021-1": 50,
    "r1021-2": 50,
    "r1021-3": 50,
    "r1021-4": 50,
    "r1021-5": 50,
    "r1021-6": 50,
    "r1022-1": 50,
    "r1022-2": 50,
    "r1022-3": 50,
    "r1022-4": 50,
    "r1022-5": 50,
    "r1022-6": 50,
    "r1024-1": 50,
    "r1024-2": 50,
    "r1024-3": 50,
    "r1024-4": 50,
    "r1024-5": 50,
    "r1024-6": 50,
    "r1027-1": 50,
    "r1027-2": 50,
    "r1027-3": 50,
    "r1027-4": 50,
    "r1027-5": 50,
    "r1027-6": 50,
    "r1028-1": 50,
    "r1028-2": 50,
    "r1028-3": 50,
    "r1028-4": 50,
    "r1028-5": 50,
    "r1028-6": 50,
    "r1030-1": 50,
    "r1030-2": 50,
    "r1030-3": 50,
    "r1030-4": 50,
    "r1030-5": 50,
    "r1030-6": 50,
    "r1034-1": 50,
    "r1034-2": 50,
    "r1034-3": 50,
    "r1034-4": 50,
    "r1034-5": 50,
    "r1034-6": 50,
    "r1039-1": 50,
    "r1039-2": 50,
    "r1039-3": 50,
    "r1039-4": 50,
    "r1039-5": 50,
    "r1039-6": 50,
    "r1040-1": 50,
    "r1040-2": 50,
    "r1040-3": 50,
    "r1040-4": 50,
    "r1040-5": 50,
    "r1040-6": 50,
    "r1041-1": 50,
    "r1041-2": 50,
    "r1041-3": 50,
    "r1041-4": 50,
    "r1041-5": 50,
    "r1041-6": 50,
    "r1043-1": 50,
    "r1043-2": 50,
    "r1043-3": 50,
    "r1043-4": 50,
    "r1043-5": 50,
    "r1043-6": 50,
    "r1045-1": 50,
    "r1045-2": 50,
    "r1045-3": 50,
    "r1045-4": 50,
    "r1045-5": 50,
    "r1045-6": 50,
    "r1047-1": 50,
    "r1047-2": 50,
    "r1047-3": 50,
    "r1047-4": 50,
    "r1047-5": 50,
    "r1047-6": 50,
    "r1048-1": 50,
    "r1048-2": 50,
    "r1048-3": 50,
    "r1048-4": 50,
    "r1048-5": 50,
    "r1048-6": 50,
    "r1050-1": 50,
    "r1050-2": 50,
    "r1050-3": 50,
    "r1050-4": 50,
    "r1050-5": 50,
    "r1050-6": 50,
    "r1052-1": 50,
    "r1052-2": 50,
    "r1052-3": 50,
    "r1052-4": 50,
    "r1052-5": 50,
    "r1052-6": 50,
    "r1055-1": 50,
    "r1055-2": 50,
    "r1055-3": 50,
    "r1055-4": 50,
    "r1055-5": 50,
    "r1055-6": 50,
    "r1057-1": 50,
    "r1057-2": 50,
    "r1057-3": 50,
    "r1057-4": 50,
    "r1057-5": 50,
    "r1057-6": 50,
    "r1058-1": 50,
    "r1058-2": 50,
    "r1058-3": 50,
    "r1058-4": 50,
    "r1058-5": 50,
    "r1058-6": 50,
    "r1060-1": 50,
    "r1060-2": 50,
    "r1060-3": 50,
    "r1060-4": 50,
    "r1060-5": 50,
    "r1060-6": 50,
    "r1061-1": 50,
    "r1061-2": 50,
    "r1061-3": 50,
    "r1061-4": 50,
    "r1061-5": 50,
    "r1061-6": 50,
    "r1062-1": 50,
    "r1062-2": 50,
    "r1062-3": 50,
    "r1062-4": 50,
    "r1062-5": 50,
    "r1062-6": 50,
    "r1063-1": 50,
    "r1063-2": 50,
    "r1063-3": 50,
    "r1063-4": 50,
    "r1063-5": 50,
    "r1063-6": 50,
    "r1064-1": 50,
    "r1064-2": 50,
    "r1064-3": 50,
    "r1064-4": 50,
    "r1064-5": 50,
    "r1064-6": 50,
    "r1065-1": 50,
    "r1065-2": 50,
    "r1065-3": 50,
    "r1065-4": 50,
    "r1065-5": 50,
    "r1065-6": 50,
    "r1066-1": 50,
    "r1066-2": 50,
    "r1066-3": 50,
    "r1066-4": 50,
    "r1066-5": 50,
    "r1066-6": 50,
    "r1069-1": 50,
    "r1069-2": 50,
    "r1069-3": 50,
    "r1069-4": 50,
    "r1069-5": 50,
    "r1069-6": 50,
    "r1071-1": 50,
    "r1071-2": 50,
    "r1071-3": 50,
    "r1071-4": 50,
    "r1071-5": 50,
    "r1071-6": 50,
    "r1072-1": 50,
    "r1072-2": 50,
    "r1072-3": 50,
    "r1072-4": 50,
    "r1072-5": 50,
    "r1072-6": 50,
    "r1073-1": 50,
    "r1073-2": 50,
    "r1073-3": 50,
    "r1073-4": 50,
    "r1073-5": 50,
    "r1073-6": 50,
    "r1076-1": 50,
    "r1076-2": 50,
    "r1076-3": 50,
    "r1076-4": 50,
    "r1076-5": 50,
    "r1076-6": 50,
    "r1077-1": 50,
    "r1077-2": 50,
    "r1077-3": 50,
    "r1077-4": 50,
    "r1077-5": 50,
    "r1077-6": 50,
    "r1085-1": 50,
    "r1085-2": 50,
    "r1085-3": 50,
    "r1085-4": 50,
    "r1085-5": 50,
    "r1085-6": 50,
    "r1089-1": 50,
    "r1089-2": 50,
    "r1089-3": 50,
    "r1089-4": 50,
    "r1089-5": 50,
    "r1089-6": 50,
    "r1091-1": 50,
    "r1091-2": 50,
    "r1091-3": 50,
    "r1091-4": 50,
    "r1091-5": 50,
    "r1091-6": 50,
    "r1093-1": 50,
    "r1093-2": 50,
    "r1093-3": 50,
    "r1093-4": 50,
    "r1093-5": 50,
    "r1093-6": 50,
    "r1095-1": 50,
    "r1095-2": 50,
    "r1095-3": 50,
    "r1095-4": 50,
    "r1095-5": 50,
    "r1095-6": 50,
    "r1097-1": 50,
    "r1097-2": 50,
    "r1097-3": 50,
    "r1097-4": 50,
    "r1097-5": 50,
    "r1097-6": 50,
    "r1099-1": 50,
    "r1099-2": 50,
    "r1099-3": 50,
    "r1099-4": 50,
    "r1099-5": 50,
    "r1099-6": 50,
    "r1100-1": 50,
    "r1100-2": 50,
    "r1100-3": 50,
    "r1100-4": 50,
    "r1100-5": 50,
    "r1100-6": 50,
    "r1101-1": 50,
    "r1101-2": 50,
    "r1101-3": 50,
    "r1101-4": 50,
    "r1101-5": 50,
    "r1101-6": 50,
    "r1104-1": 50,
    "r1104-2": 50,
    "r1104-3": 50,
    "r1104-4": 50,
    "r1104-5": 50,
    "r1104-6": 50,
    "r1106-1": 50,
    "r1106-2": 50,
    "r1106-3": 50,
    "r1106-4": 50,
    "r1106-5": 50,
    "r1106-6": 50,
    "r1107-1": 50,
    "r1107-2": 50,
    "r1107-3": 50,
    "r1107-4": 50,
    "r1107-5": 50,
    "r1107-6": 50,
    "r1108-1": 50,
    "r1108-2": 50,
    "r1108-3": 50,
    "r1108-4": 50,
    "r1108-5": 50,
    "r1108-6": 50,
    "r1109-1": 50,
    "r1109-2": 50,
    "r1109-3": 50,
    "r1109-4": 50,
    "r1109-5": 50,
    "r1109-6": 50,
    "r1110-1": 50,
    "r1110-2": 50,
    "r1110-3": 50,
    "r1110-4": 50,
    "r1110-5": 50,
    "r1110-6": 50,
    "r1111-1": 50,
    "r1111-2": 50,
    "r1111-3": 50,
    "r1111-4": 50,
    "r1111-5": 50,
    "r1111-6": 50,
    "r1112-1": 50,
    "r1112-2": 50,
    "r1112-3": 50,
    "r1112-4": 50,
    "r1112-5": 50,
    "r1112-6": 50,
    "r1113-1": 50,
    "r1113-2": 50,
    "r1113-3": 50,
    "r1113-4": 50,
    "r1113-5": 50,
    "r1113-6": 50,
    "r1116-1": 50,
    "r1116-2": 50,
    "r1116-3": 50,
    "r1116-4": 50,
    "r1116-5": 50,
    "r1116-6": 50,
    "r1120-1": 50,
    "r1120-2": 50,
    "r1120-3": 50,
    "r1120-4": 50,
    "r1120-5": 50,
    "r1120-6": 50,
    "r1123-1": 50,
    "r1123-2": 50,
    "r1123-3": 50,
    "r1123-4": 50,
    "r1123-5": 50,
    "r1123-6": 50,
    "r1124-1": 50,
    "r1124-2": 50,
    "r1124-3": 50,
    "r1124-4": 50,
    "r1124-5": 50,
    "r1124-6": 50,
    "r1128-1": 50,
    "r1128-2": 50,
    "r1128-3": 50,
    "r1128-4": 50,
    "r1128-5": 50,
    "r1128-6": 50,
    "r1130-1": 50,
    "r1130-2": 50,
    "r1130-3": 50,
    "r1130-4": 50,
    "r1130-5": 50,
    "r1130-6": 50,
    "r1131-1": 50,
    "r1131-2": 50,
    "r1131-3": 50,
    "r1131-4": 50,
    "r1131-5": 50,
    "r1131-6": 50,
    "r1132-1": 50,
    "r1132-2": 50,
    "r1132-3": 50,
    "r1132-4": 50,
    "r1132-5": 50,
    "r1132-6": 50,
    "r1134-1": 50,
    "r1134-2": 50,
    "r1134-3": 50,
    "r1134-4": 50,
    "r1134-5": 50,
    "r1134-6": 50,
    "r1139-1": 50,
    "r1139-2": 50,
    "r1139-3": 50,
    "r1139-4": 50,
    "r1139-5": 50,
    "r1139-6": 50,
    "r1140-1": 50,
    "r1140-2": 50,
    "r1140-3": 50,
    "r1140-4": 50,
    "r1140-5": 50,
    "r1140-6": 50,
    "r1141-1": 50,
    "r1141-2": 50,
    "r1141-3": 50,
    "r1141-4": 50,
    "r1141-5": 50,
    "r1141-6": 50,
    "r1142-1": 50,
    "r1142-2": 50,
    "r1142-3": 50,
    "r1142-4": 50,
    "r1142-5": 50,
    "r1142-6": 50,
    "r1143-1": 50,
    "r1143-2": 50,
    "r1143-3": 50,
    "r1143-4": 50,
    "r1143-5": 50,
    "r1143-6": 50,
    "r1145-1": 50,
    "r1145-2": 50,
    "r1145-3": 50,
    "r1145-4": 50,
    "r1145-5": 50,
    "r1145-6": 50,
    "r1146-1": 50,
    "r1146-2": 50,
    "r1146-3": 50,
    "r1146-4": 50,
    "r1146-5": 50,
    "r1146-6": 50,
    "r1147-1": 50,
    "r1147-2": 50,
    "r1147-3": 50,
    "r1147-4": 50,
    "r1147-5": 50,
    "r1147-6": 50,
    "r1149-1": 50,
    "r1149-2": 50,
    "r1149-3": 50,
    "r1149-4": 50,
    "r1149-5": 50,
    "r1149-6": 50,
    "r1151-1": 50,
    "r1151-2": 50,
    "r1151-3": 50,
    "r1151-4": 50,
    "r1151-5": 50,
    "r1151-6": 50,
    "r1152-1": 50,
    "r1152-2": 50,
    "r1152-3": 50,
    "r1152-4": 50,
    "r1152-5": 50,
    "r1152-6": 50,
    "r1153-1": 50,
    "r1153-2": 50,
    "r1153-3": 50,
    "r1153-4": 50,
    "r1153-5": 50,
    "r1153-6": 50,
    "r1154-1": 50,
    "r1154-2": 50,
    "r1154-3": 50,
    "r1154-4": 50,
    "r1154-5": 50,
    "r1154-6": 50,
    "r1157-1": 50,
    "r1157-2": 50,
    "r1157-3": 50,
    "r1157-4": 50,
    "r1157-5": 50,
    "r1157-6": 50,
    "r1160-1": 50,
    "r1160-2": 50,
    "r1160-3": 50,
    "r1160-4": 50,
    "r1160-5": 50,
    "r1160-6": 50,
    "r1161-1": 50,
    "r1161-2": 50,
    "r1161-3": 50,
    "r1161-4": 50,
    "r1161-5": 50,
    "r1161-6": 50,
    "r1162-1": 50,
    "r1162-2": 50,
    "r1162-3": 50,
    "r1162-4": 50,
    "r1162-5": 50,
    "r1162-6": 50,
    "r1164-1": 50,
    "r1164-2": 50,
    "r1164-3": 50,
    "r1164-4": 50,
    "r1164-5": 50,
    "r1164-6": 50,
    "r1165-1": 50,
    "r1165-2": 50,
    "r1165-3": 50,
    "r1165-4": 50,
    "r1165-5": 50,
    "r1165-6": 50,
    "r1166-1": 50,
    "r1166-2": 50,
    "r1166-3": 50,
    "r1166-4": 50,
    "r1166-5": 50,
    "r1166-6": 50,
    "r1168-1": 50,
    "r1168-2": 50,
    "r1168-3": 50,
    "r1168-4": 50,
    "r1168-5": 50,
    "r1168-6": 50,
    "r1169-1": 50,
    "r1169-2": 50,
    "r1169-3": 50,
    "r1169-4": 50,
    "r1169-5": 50,
    "r1169-6": 50,
    "r1171-1": 50,
    "r1171-2": 50,
    "r1171-3": 50,
    "r1171-4": 50,
    "r1171-5": 50,
    "r1171-6": 50,
    "r1173-1": 50,
    "r1173-2": 50,
    "r1173-3": 50,
    "r1173-4": 50,
    "r1173-5": 50,
    "r1173-6": 50,
    "r1174-1": 50,
    "r1174-2": 50,
    "r1174-3": 50,
    "r1174-4": 50,
    "r1174-5": 50,
    "r1174-6": 50,
    "r1175-1": 50,
    "r1175-2": 50,
    "r1175-3": 50,
    "r1175-4": 50,
    "r1175-5": 50,
    "r1175-6": 50,
    "r1176-1": 50,
    "r1176-2": 50,
    "r1176-3": 50,
    "r1176-4": 50,
    "r1176-5": 50,
    "r1176-6": 50,
    "r1177-1": 50,
    "r1177-2": 50,
    "r1177-3": 50,
    "r1177-4": 50,
    "r1177-5": 50,
    "r1177-6": 50,
    "r1178-1": 50,
    "r1178-2": 50,
    "r1178-3": 50,
    "r1178-4": 50,
    "r1178-5": 50,
    "r1178-6": 50,
    "r1179-1": 50,
    "r1179-2": 50,
    "r1179-3": 50,
    "r1179-4": 50,
    "r1179-5": 50,
    "r1179-6": 50,
    "r1180-1": 50,
    "r1180-2": 50,
    "r1180-3": 50,
    "r1180-4": 50,
    "r1180-5": 50,
    "r1180-6": 50,
    "r1181-1": 50,
    "r1181-2": 50,
    "r1181-3": 50,
    "r1181-4": 50,
    "r1181-5": 50,
    "r1181-6": 50,
    "r1182-1": 50,
    "r1182-2": 50,
    "r1182-3": 50,
    "r1182-4": 50,
    "r1182-5": 50,
    "r1182-6": 50,
    "r1183-1": 50,
    "r1183-2": 50,
    "r1183-3": 50,
    "r1183-4": 50,
    "r1183-5": 50,
    "r1183-6": 50,
    "r1184-1": 50,
    "r1184-2": 50,
    "r1184-3": 50,
    "r1184-4": 50,
    "r1184-5": 50,
    "r1184-6": 50,
    "r1185-1": 50,
    "r1185-2": 50,
    "r1185-3": 50,
    "r1185-4": 50,
    "r1185-5": 50,
    "r1185-6": 50,
    "r1187-1": 50,
    "r1187-2": 50,
    "r1187-3": 50,
    "r1187-4": 50,
    "r1187-5": 50,
    "r1187-6": 50,
    "r1188-1": 50,
    "r1188-2": 50,
    "r1188-3": 50,
    "r1188-4": 50,
    "r1188-5": 50,
    "r1188-6": 50,
    "r1190-1": 50,
    "r1190-2": 50,
    "r1190-3": 50,
    "r1190-4": 50,
    "r1190-5": 50,
    "r1190-6": 50,
    "r1192-1": 50,
    "r1192-2": 50,
    "r1192-3": 50,
    "r1192-4": 50,
    "r1192-5": 50,
    "r1192-6": 50,
    "r1194-1": 50,
    "r1194-2": 50,
    "r1194-3": 50,
    "r1194-4": 50,
    "r1194-5": 50,
    "r1194-6": 50,
    "r1196-1": 50,
    "r1196-2": 50,
    "r1196-3": 50,
    "r1196-4": 50,
    "r1196-5": 50,
    "r1196-6": 50,
    "r1197-1": 50,
    "r1197-2": 50,
    "r1197-3": 50,
    "r1197-4": 50,
    "r1197-5": 50,
    "r1197-6": 50,
    "r1198-1": 50,
    "r1198-2": 50,
    "r1198-3": 50,
    "r1198-4": 50,
    "r1198-5": 50,
    "r1198-6": 50,
    "r1199-1": 50,
    "r1199-2": 50,
    "r1199-3": 50,
    "r1199-4": 50,
    "r1199-5": 50,
    "r1199-6": 50,
    "r1200-1": 50,
    "r1200-2": 50,
    "r1200-3": 50,
    "r1200-4": 50,
    "r1200-5": 50,
    "r1200-6": 50,
    "r1201-1": 50,
    "r1201-2": 50,
    "r1201-3": 50,
    "r1201-4": 50,
    "r1201-5": 50,
    "r1201-6": 50,
    "r1202-1": 50,
    "r1202-2": 50,
    "r1202-3": 50,
    "r1202-4": 50,
    "r1202-5": 50,
    "r1202-6": 50,
    "r1203-1": 50,
    "r1203-2": 50,
    "r1203-3": 50,
    "r1203-4": 50,
    "r1203-5": 50,
    "r1203-6": 50,
    "r1204-1": 50,
    "r1204-2": 50,
    "r1204-3": 50,
    "r1204-4": 50,
    "r1204-5": 50,
    "r1204-6": 50,
    "r1205-1": 50,
    "r1205-2": 50,
    "r1205-3": 50,
    "r1205-4": 50,
    "r1205-5": 50,
    "r1205-6": 50,
    "r1206-1": 50,
    "r1206-2": 50,
    "r1206-3": 50,
    "r1206-4": 50,
    "r1206-5": 50,
    "r1206-6": 50,
    "r1209-1": 50,
    "r1209-2": 50,
    "r1209-3": 50,
    "r1209-4": 50,
    "r1209-5": 50,
    "r1209-6": 50,
    "r1210-1": 50,
    "r1210-2": 50,
    "r1210-3": 50,
    "r1210-4": 50,
    "r1210-5": 50,
    "r1210-6": 50,
    "r1211-1": 50,
    "r1211-2": 50,
    "r1211-3": 50,
    "r1211-4": 50,
    "r1211-5": 50,
    "r1211-6": 50,
    "r1212-1": 50,
    "r1212-2": 50,
    "r1212-3": 50,
    "r1212-4": 50,
    "r1212-5": 50,
    "r1212-6": 50,
    "r1215-1": 50,
    "r1215-2": 50,
    "r1215-3": 50,
    "r1215-4": 50,
    "r1215-5": 50,
    "r1215-6": 50,
    "r1216-1": 50,
    "r1216-2": 50,
    "r1216-3": 50,
    "r1216-4": 50,
    "r1216-5": 50,
    "r1216-6": 50,
    "r1219-1": 50,
    "r1219-2": 50,
    "r1219-3": 50,
    "r1219-4": 50,
    "r1219-5": 50,
    "r1219-6": 50,
    "r1222-1": 50,
    "r1222-2": 50,
    "r1222-3": 50,
    "r1222-4": 50,
    "r1222-5": 50,
    "r1222-6": 50,
    "r1223-1": 50,
    "r1223-2": 50,
    "r1223-3": 50,
    "r1223-4": 50,
    "r1223-5": 50,
    "r1223-6": 50,
    "r1225-1": 50,
    "r1225-2": 50,
    "r1225-3": 50,
    "r1225-4": 50,
    "r1225-5": 50,
    "r1225-6": 50,
    "r1226-1": 50,
    "r1226-2": 50,
    "r1226-3": 50,
    "r1226-4": 50,
    "r1226-5": 50,
    "r1226-6": 50,
    "r1227-1": 50,
    "r1227-2": 50,
    "r1227-3": 50,
    "r1227-4": 50,
    "r1227-5": 50,
    "r1227-6": 50,
    "r1229-1": 50,
    "r1229-2": 50,
    "r1229-3": 50,
    "r1229-4": 50,
    "r1229-5": 50,
    "r1229-6": 50,
    "r1230-1": 50,
    "r1230-2": 50,
    "r1230-3": 50,
    "r1230-4": 50,
    "r1230-5": 50,
    "r1230-6": 50,
    "r1231-1": 50,
    "r1231-2": 50,
    "r1231-3": 50,
    "r1231-4": 50,
    "r1231-5": 50,
    "r1231-6": 50,
    "r1232-1": 50,
    "r1232-2": 50,
    "r1232-3": 50,
    "r1232-4": 50,
    "r1232-5": 50,
    "r1232-6": 50,
    "r1233-1": 50,
    "r1233-2": 50,
    "r1233-3": 50,
    "r1233-4": 50,
    "r1233-5": 50,
    "r1233-6": 50,
    "r1235-1": 50,
    "r1235-2": 50,
    "r1235-3": 50,
    "r1235-4": 50,
    "r1235-5": 50,
    "r1235-6": 50,
    "r1236-1": 50,
    "r1236-2": 50,
    "r1236-3": 50,
    "r1236-4": 50,
    "r1236-5": 50,
    "r1236-6": 50,
    "r1237-1": 50,
    "r1237-2": 50,
    "r1237-3": 50,
    "r1237-4": 50,
    "r1237-5": 50,
    "r1237-6": 50,
    "r1238-1": 50,
    "r1238-2": 50,
    "r1238-3": 50,
    "r1238-4": 50,
    "r1238-5": 50,
    "r1238-6": 50,
    "r1239-1": 50,
    "r1239-2": 50,
    "r1239-3": 50,
    "r1239-4": 50,
    "r1239-5": 50,
    "r1239-6": 50,
    "r1240-1": 50,
    "r1240-2": 50,
    "r1240-3": 50,
    "r1240-4": 50,
    "r1240-5": 50,
    "r1240-6": 50,
    "r1241-1": 50,
    "r1241-2": 50,
    "r1241-3": 50,
    "r1241-4": 50,
    "r1241-5": 50,
    "r1241-6": 50,
    "r1242-1": 50,
    "r1242-2": 50,
    "r1242-3": 50,
    "r1242-4": 50,
    "r1242-5": 50,
    "r1242-6": 50,
    "r1243-1": 50,
    "r1243-2": 50,
    "r1243-3": 50,
    "r1243-4": 50,
    "r1243-5": 50,
    "r1243-6": 50,
    "r1244-1": 50,
    "r1244-2": 50,
    "r1244-3": 50,
    "r1244-4": 50,
    "r1244-5": 50,
    "r1244-6": 50,
    "r1245-1": 50,
    "r1245-2": 50,
    "r1245-3": 50,
    "r1245-4": 50,
    "r1245-5": 50,
    "r1245-6": 50,
    "r1246-1": 50,
    "r1246-2": 50,
    "r1246-3": 50,
    "r1246-4": 50,
    "r1246-5": 50,
    "r1246-6": 50,
    "r1247-1": 50,
    "r1247-2": 50,
    "r1247-3": 50,
    "r1247-4": 50,
    "r1247-5": 50,
    "r1247-6": 50,
    "r1248-1": 50,
    "r1248-2": 50,
    "r1248-3": 50,
    "r1248-4": 50,
    "r1248-5": 50,
    "r1248-6": 50,
    "r1249-1": 50,
    "r1249-2": 50,
    "r1249-3": 50,
    "r1249-4": 50,
    "r1249-5": 50,
    "r1249-6": 50,
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
    r6015: true,
    r6016: true,
    r6017: true,
  };
}
