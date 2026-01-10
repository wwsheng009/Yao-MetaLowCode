import { Process } from "@yao/runtime";
import { saveCurdRecord } from "./curd";

/**
 * 创建权限时的空白模板数据
 * @returns
 */
function getBlankRoleData() {
  const rightEntityList = Process("models.meta.entity.get", {
    select: ["entityCode", "authorizable", "name", "label"],
    limit: 10000,
  });

  let rightMap = {
    r6000: true, //系统通用配置
    r6001: true, //实体管理
    r6002: true, //删除实体
    r6003: true, //设计表单布局
    r6005: true, //单选项管理
    r6006: true, //多选项管理
    r6007: true, //配置导航
    r6008: true, //列表页面设计
    r6009: true, //回收站管理
    r6010: true, //修改历史查询
    r6011: true, //数据导入
    r6013: true, //审批撤销
    r6014: true, //登录日志查看
    r6015: true, //触发器执行日志
    r6016: true, //流程配置管理
    r6017: true, //开发应用
  };

  //操作：
  //1 查看权限
  //2 新建权限
  //3 修改权限
  //4 删除权限
  //5 分配权限
  //6 共享权限

  rightEntityList.forEach((entity) => {
    rightMap[`r${entity.entityCode}-1`] = 50;
    rightMap[`r${entity.entityCode}-2`] = 50;
    rightMap[`r${entity.entityCode}-3`] = 50;
    rightMap[`r${entity.entityCode}-4`] = 50;
    rightMap[`r${entity.entityCode}-5`] = 50;
    rightMap[`r${entity.entityCode}-6`] = 50;
  });

  return {
    roleId: null,
    roleName: "",
    disabled: false,
    description: "",
    rightValueMap: rightMap,
    rightEntityList: rightEntityList,
  };
}
function getRoleData(roleId) {
  // const [entityCode, id] = roleId.split("-");
  // loadEntityToYao("Role");
  const role = Process("models.role.get", {
    select: ["roleId", "roleName", "disabled", "description", "rightJson"],
    wheres: [
      {
        column: "roleId",
        value: roleId,
      },
    ],
  });
  if (!role) {
    throw Error(`权限配置:${roleId}不存在`);
  }
  const rightEntityList = Process("models.meta.entity.get", {
    select: ["entityCode", "authorizable", "name", "label"],
    limit: 10000,
  });
  return {
    roleId: role.roleId, //`${entityCode}-${role.roleId}`,
    roleName: role.roleName,
    disabled: role.disabled,
    description: role.description,
    rightValueMap: role.rightJson ? JSON.parse(role.rightJson) : {},
    rightEntityList,
  };
}

function saveRole(roleDTO) {
  const { description, disabled, roleId, roleName, rightValueMap } = roleDTO;

  let result = saveCurdRecord("Role", roleId, {
    description,
    disabled,
    roleName,
    rightJson: JSON.stringify(rightValueMap),
  });
  return result;
}

function deleteRole(roleId) {
  // const [entityCode, id] = roleId.split("-");
  // loadEntityToYao("Role");
  const result = Process("models.role.deletewhere", {
    wheres: [
      {
        column: "roleId",
        value: roleId,
      },
    ],
  });
  if (!result) {
    return true;
  } else if (result.code && result.message) {
    throw Error(`删除权限失败:${roleId}=>${result.code}|${result.message}`);
  }
}
function listRole() {
  // const entity = getEntityByNameCache("Role");
  const roleList = Process("models.role.get", {
    select: ["roleId", "roleName"],
    limit: 10000,
  });

  return roleList;
  // return roleList.map((r) => {
  //   return { roleId: `${entity.entityCode}-${r.roleId}`, roleName: r.roleName };
  // });
}
