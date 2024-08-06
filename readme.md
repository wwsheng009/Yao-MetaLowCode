# 使用说明


## 导入metacode模型

处理器systemmanager_import是一个工具类，用于初始化系统。

执行以下命令把模型数据与默认的表单布局，导航栏配置导入到数据。

`yao run scripts.systemmanager_import.importData`


## 生成dsl文件

把所有metacode模型转换成yao dsl文件并保存到目录models目录。

`yao studio run convert.convertMetaModel`

`yao migrate`

## 下载模型

可以使用以下处理器下载metacode测试网站上的配置信息，作为系统的测试数据。

首先需要在.env文件中维护变量METALOWCODE_WEBSITE，设置测试网站地址：
维护变量METALOWCODE_COOKIE，设置JSESSIONID。

首先需要在网页上登录metacode的测试网站，获取到Jsessionid,并在.env文件中维护变量。

下载并导入模型文件，下载可能会中断，可以尝试多次。

`yao run scripts.systemmanager_import.download`

## 下载表单布局

每一个表单都可以配置显示的关联布局

`yao run scripts.systemmanager_import.downloadFormLayout`

下载指定form的布局。

`yao run scripts.systemmanager_import.downloadFormLayout Jinxiangfapiao`


## 下载导航栏

`yao run scripts.systemmanager_import.downlaodNav`