# QihighAdmin
基于NodeJS与AceAdmin模板的Web应用项目。

使用angularJS版本的AceAdmin模板框架做Web前端；使用NodeJS的express模块做后端；使用Redis做缓存；使用MongoDB做数据库。

## 各分支说明

[master](https://github.com/marbleqi/QihighAdmin/tree/master)

：存放项目说明文件。

[dev0.1](https://github.com/marbleqi/QihighAdmin/tree/dev0.1)

存放最初原始代码。包括express初始化环境，以及aceadmin1.4英文原版源码内容。

注：如果只想要aceadmin原前端框架源码，可下周该分支后，提取[public](https://github.com/marbleqi/QihighAdmin/tree/dev0.1/public)目录下所有文件即可。

[dev0.2](https://github.com/marbleqi/QihighAdmin/tree/dev0.2)

在dev0.1的基础上提取aceadmin的angularJS模式框架，并单独构成项目（但不做界面汉化）。

注：如果只想要aceadmin的angularJS模式框架，可下周该分支后，提取[public](https://github.com/marbleqi/QihighAdmin/tree/dev0.2/public)目录下所有文件即可。

[dev0.3](https://github.com/marbleqi/QihighAdmin/tree/dev0.3)

在dev0.2的基础上对界面进行汉化，并对相关angular组件进行分析学习。

注：如果只想要aceadmin的angularJS模式汉化后的框架，可下周该分支后，提取[public](https://github.com/marbleqi/QihighAdmin/tree/dev0.3/public)目录下所有文件即可。


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

注：已完成绝大多数页面的汉化。