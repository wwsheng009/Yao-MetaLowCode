const {getFileExtension} = Require("sys.lib")

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
  let ext = getFileExtension(file.name);
  let newFname = `${uuid}`;
  if (ext) {
     newFname = `${uuid}.${ext}`;
  }
  Process("fs.system.move", file.tempFile, "/upload/" + newFname);
  return {
    name: file.name,
    url: `/api/picture/get?name=${newFname}`,
  };
}


