/**
 * 
 * the type of file:
 * 
 *```json
 *{
  name: string;//文件名称
  tempFile: string;//临时文件
  size: number;//大小，字节
  header: {
    [key: string]: object;
    mimeType: {
      "Content-Disposition": string[];
      "Content-Type": string[];
    };
  };
}```
 * @param {*} file 
 * @returns 
 */
function upload(file) {
  const uuid = Process("utils.str.UUID").replace(/-/g,"");
  let newFname = `${uuid}.${getFileExtension(file.name) || 'jpg'}`;
  Process("fs.system.move", file.tempFile, "/upload/" + newFname);
  return {
    name: file.name,
    url: `/picture/get?name=${newFname}`,
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

function getFilePath(fileName) {
  return "/upload/" + fileName;
}
