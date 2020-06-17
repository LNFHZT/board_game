## 桌游系统

### 前言

### 技术栈
node + koa + typescript + typeORM + mysql

### 项目结构
```
board_game    
 ┣ doc                          文档目录
 ┃ ┗ database                   数据库设计文档
 ┃ ┃ ┗ table.md
 ┣ source                       源码
 ┃ ┣ controller                 控制器层
 ┃ ┣ dao                        连接数据库 接口层
 ┃ ┣ entity                     实体
 ┃ ┣ plugins                    插件
 ┃ ┃ ┣ decorator                自定义修饰器方法
 ┃ ┃ ┣ global                   定义全局方法/变量
 ┃ ┃ ┣ middleware               中间件
 ┃ ┣ service                    服务层
 ┃ ┗ app.ts                     主入口文件
 ┗ types                        类型定义文件
 ```
### 项目运行
```
<!-- 安装依赖 -->
npm i 
<!-- 或者 -->
cnpm i

<!-- 项目运行 -->
npm run serve 

```
### 项目开发
开发代码提交时做了[git commit](./docs/changelog/operation.md) 规范限制 所以需要安装下面几个全局依赖  
详细说明可进[docs/changelog/operation.md](./docs/changelog/operation.md)
```
<!-- 所需全局依赖 -->
npm i -g commitizen conventional-changelog conventional-changelog-cli
<!-- 或者 -->
cnpm i -g commitizen conventional-changelog conventional-changelog-cli
```
### 项目说明
项目基于koa进行封装实现mvc模式的架构。  
1.dao 层
```
@Repository('userDAO')
export default class UserDAO {
    public addUser (user: User): number{
        return ;
    }
}
```
2.service层
```
@Service('userService')
export default class UserService {

    @Resource('userDAO')
    private userDAO!: UserDAO;

    public addUser (user: User): number{
        return this.userDAO.addUser(user);
    }
}
```
3.controller层
```
@Controller('/user', [timeCounter])
export default class UserController {

    @Resource('userService')
    private userService!: UserService;

    @RequestMapping({path: '/get/:id', method: 'get'})
    public async getUser (@PathVariable('id') userId: number){
        return this.userService.getUser(userId);
    }
}

```
entity 连接数据是使用typeORM 所以需要建立实体，通过typeORM 来建立实体
```
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  account: string;
}
```


### 项目注意
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

### [changelog](./docs/changelog/CHANGELOG.md)