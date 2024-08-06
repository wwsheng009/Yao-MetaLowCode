# 使用说明


## 下载模型

需要在.env文件中维护变量METALOWCODE_WEBSITE，设置测试网站地址：
维护变量METALOWCODE_COOKIE，设置JSESSIONID。

首先需要在网页上登录metacode的测试网站，获取到Jsessionid,并在.env文件中维护变量。

下载并导入模型文件，下载可能会中断，可以尝试多次。

`yao run scripts.systemmanager_import.download`