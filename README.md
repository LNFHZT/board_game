## 桌游系统

### 项目结构

### 项目运行
```
<!-- 安装依赖 -->
npm i 
<!-- 或者 -->
cnpm i

<!-- 项目运行 -->
npm run serve 

```

### 项目说明
因为项目连接数据是使用 typeORM 所以需要创建 连接数据的配置文件 ormconfig.json
```
{
    "type": "mysql",
    "host": "地址",
    "port": 3306,
    "username": "账号",
    "password": "密码",
    "database": "数据库",
    "logging": true,
    "entities": ["source/model/*.ts"]
}
``` 
tslib  因更新依赖导致 出现 项目无法运行 提示错误
```
TypeError: Cannot set property EntityManager of #<Object> which has only a getter
```
临时解决办法：在package.json 里面 新增旧版本 tslib 依赖替换新更新依赖
然后删除node_modules 里面的 tslib 
```
<!-- 执行 在项目的 package.json 新增tslib -->
npm i tslib@1.11.2 --save
<!-- 修改package.json "tslib": "^1.11.2" 改为  "tslib": "1.11.2" -->
<!-- 删除 node_modules 非1.11.2 版本的 tslib -->
```