### 桌游系统 数据库设计


user 用户表
-
| 字段       |        类型 | 是否不为空 |             注释             |
|------------|------------:|:----------:|:----------------------------:|
| userId     |         int |    true    |       用户id  primary        |
| nickName   |  varchar 20 |   false    |             昵称             |
| sex        |         bit |    true    |          0-女 1-男           |
| header     | varchar 100 |   false    |             头像             |
| createTime |      bigint |    true    |           创建时间           |
| updateTime |      bigint |    true    |           更新时间           |
| state      |         int |    true    | 状态  0 正常 -1 删除过的用户 |

wx_user_center 微信用户表
-
| 字段       |       类型 | 是否不为空 |             注释             |
|------------|-----------:|:----------:|:----------------------------:|
| wucId      |        int |    true    |         id  primary          |
| openId     | varchar 30 |    true    |        微信平台openId        |
| userId     |        int |    true    |            用户id            |
| unionid    | varchar 30 |   false    |      微信平台唯一标识id      |
| info       |       text |   false    |         微信用户数据         |
| createTime |     bigint |    true    |           创建时间           |
| updateTime |     bigint |    true    |           更新时间           |
| state      |        int |    true    | 状态  0 正常 -1 删除过的用户 |




