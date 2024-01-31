// 数据导出
function exportExcel(payload) {}
// 文件上传
function upload(file) {
    // file = {
    //     "mimeType": {
    //         "Content-Disposition": [
    //             "form-data; name="uploadFile"; filename="test.xlsx""
    //         ],
    //         "Content-Type": [
    //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //         ]
    //     },
    //     "name": "test.xlsx",
    //     "size": 6197,
    //     "tempFile": "/tmp/upload486527302/file-3814400388.xlsx"
    // }
    const uuid = Process("utils.str.UUID").replace(/-/g,"");
    let newFname = `${uuid}.${getFileExtension(file.name) || 'xlsx'}`;
    Process("fs.system.move", file.tempFile, "/upload/" + newFname);
    return {
      name: file.name,
      url: `/api/file/get?name=${newFname}`,
    };
  }
  function getFileExtension(filename) {
    if (filename.includes(".")) {
      return filename.substring(filename.lastIndexOf(".") + 1);
    } else {
      // Return an empty string if there is no dot (and hence no extension)
      return "";
    }
  }
// 检查导入文件
function checkFile({ uploadFile }) {}
// 开始导入
function begImport(data) {}
// 导入进度
function importTrace(taskId) {}
