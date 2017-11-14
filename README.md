# QihighAdmin
基于NodeJS与AceAdmin模板的Web应用项目。

使用angularJS版本的AceAdmin模板框架做Web前端；使用NodeJS的express模块做后端；使用Redis做缓存；使用MongoDB做数据库。

## 基本环境搭建说明

1. [运行环境搭建步骤](docs/build.md)

执行搭建步骤中的1至10步，即可启动项目。

应用启动的默认端口号为3000。

注：环境搭建完成后，项目下会创建node_modules目录，该目录会存放express依赖的NodeJS包。该目录不纳入版本管理。

2. [升级https服务](docs/https.md)

目前对于网站应用增加了安全性要求，执行步骤中的操作，重新启动服务即可实现全站https服务。

应用启动的默认端口号为443。

3. 去除express默认的view模板，以及默认的路由。

删除views目录，及routes目录下的文件，并重新在public目录下创建空的index.html。

以此环境作为后续部署aceadmin框架，以及开发WebAPI的基础。

4. 原版aceadmin中angular方案框架部署。

public目录下为aceadmin原1.4英文版中angular方案框架的源码。启动应用后即可查看框架运行效果。

有兴趣的同学可以直接下载该目录下文件做前端开发。

5. 基于原版aceadmin中angular方案框架进行汉化。

注：已完成10%左右页面的汉化。