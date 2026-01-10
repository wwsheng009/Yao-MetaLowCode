import { Process } from "@yao/runtime";

function listTeam(query) {}
// 保存团队
function saveTeam(entityName, id, formModel) {
  return Process("scripts.curd.saveRecord", entityName, id, formModel);
}
// 删除团队
function delTeam(teamId) {
  Process("models.team.deletewhere", {
    wheres: [
      {
        column: "teamId",
        value: teamId,
      },
    ],
  });

  Process("models.ReferenceListMap.deletewhere", {
    wheres: [
      {
        column: "toId",
        value: teamId,
      },
    ],
  });
}
// 删除团队成员
function delTeamMembers(id, userId) {}
// 添加团队成员
function addTeamMembers(body) {}
// 获取团队成员
function getTeamMembers(teamId) {}
