# 运行环境搭建步骤

## 必选安装步骤
1. 安装epel
获取安全且较近的安装源
```
yum install epel-release
```

2. 安装npm
npm是nodejs的包管理工具
```
yum install npm
```
查看npm安装版本
```
npm -v
```

3. 安装NodeJS
先安装Nodejs安装工具n
```
npm install -g n
```
通过以下命令安装最新的Node.js版本
```
n latest
```
查看Node.js的安装版本情况
```
node -v
```

4. 安装express
```
npm install -g express
```

5. 安装express-generator
安装该工具后，可创建初始化的express项目
```
npm install -g express-generator
```

6. 安装nodemon模块，可监控nodejs文件更新，并在更新后自动重启服务
```
npm install -g nodemon
```

7. 安装pm2工具，用于守护nodejs的web应用进程
```
npm install pm2 -g
```

8. 创建express项目wwwapp，注：项目名称可自行定义
```
express wwwapp
```

9. 初始化express项目
```
cd wwwapp
npm install
```

10. 使用pm2启动项目（在wwwapp目录下）
```
pm2 start bin/www
```

## 可选安装步骤
1. 安装ws模块。注：可使得Web应用支持WebSocket协议
```
npm install -g ws --save
```

2. 安装MongoDB数据库。注：NodeJS可直接访问的数据库
先安装服务端
```
yum install mongodb-server
```
再安装客户端
```
yum install mongodb
```
查看数据库版本
```
mongo --version
```

3. 安装Redis数据库
```
yum install redis
```
查看已安装的Redis版本
```
redis-cli --version
```

4. 安装前端js包安装工具bower，及部分前端包。（注：使用AceAdmin框架，不需执行该步骤）
```
npm install -g bower
```
初始化bower设置，在应用目录执行，创建bower.json文件
```
bower init --allow-root
```
在应用目录下创建bower库文件存放路径文件.bowerrc
```
vim .bowerrc
```

安装angular
```
bower install --allow-root --save angular
```
安装bootstrap
```
bower install --allow-root --save bootstrap
```
