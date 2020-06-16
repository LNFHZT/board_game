### 桌游系统 数据库设计


user 用户表
-
| 字段         |        类型 | 是否不为空 |             注释             |
|--------------|------------:|:----------:|:----------------------------:|
| userId       |         int |    true    |       用户id  primary        |
| nickName     |  varchar 30 |   false    |             昵称             |
| sex          |         bit |    true    |        性别 0-女 1-男        |
| headPortrait | varchar 100 |   false    |             头像             |
| createTime   |      bigint |    true    |           创建时间           |
| updateTime   |      bigint |    true    |           更新时间           |
| state        |         int |    true    | 状态  0 正常 -1 删除过的用户 |

wx_user_center 微信用户表
-
| 字段       |       类型 | 是否不为空 |             注释             |
|------------|-----------:|:----------:|:----------------------------:|
| wucId      |        int |    true    |    微信用户  id  primary     |
| openId     | varchar 30 |    true    |        微信平台openId        |
| userId     |        int |    true    |            用户id            |
| unionId    | varchar 30 |   false    |      微信用户唯一标识id      |
| info       |       text |   false    |         微信用户数据         |
| createTime |     bigint |    true    |           创建时间           |
| updateTime |     bigint |    true    |           更新时间           |
| state      |        int |    true    | 状态  0 正常 -1 删除过的用户 |


game_type 游戏类型表
-
| 字段       |       类型 | 是否不为空 |        注释         |
|------------|-----------:|:----------:|:-------------------:|
| gtId       |        int |    true    | 类型Id  id  primary |
| name       | varchar 30 |    true    |       类型名        |
| createTime |     bigint |    true    |      创建时间       |
| updateTime |     bigint |    true    |      更新时间       |
| state      |        int |    true    |    状态  0 正常     |


game 游戏表
-
| 字段            |       类型 | 是否不为空 |     注释     |
|-----------------|-----------:|:----------:|:------------:|
| gamId           |        int |    true    | id  primary  |
| gtId            |        int |    true    |    类型id    |
| name            | varchar 30 |    true    |    游戏名    |
| describe        |       text |   false    |     描述     |
| ruleDescription |       text |   false    |   规则描述   |
| createTime      |     bigint |    true    |   创建时间   |
| updateTime      |     bigint |    true    |   更新时间   |
| state           |        int |    true    | 状态  0 正常 |


camp 阵营表
-
| 字段       |       类型 | 是否不为空 |     注释     |
|------------|-----------:|:----------:|:------------:|
| camId      |        int |    true    | id  primary  |
| gamId      |        int |    true    |    游戏id    |
| name       | varchar 30 |    true    |    阵营名    |
| describe   |       text |   false    |   阵营描述   |
| createTime |     bigint |    true    |   创建时间   |
| updateTime |     bigint |    true    |   更新时间   |
| state      |        int |    true    | 状态  0 正常 |

camp_relation 阵营关系表
-
| 字段       |   类型 | 是否不为空 |     注释     |
|------------|-------:|:----------:|:------------:|
| crId       |    int |    true    | id  primary  |
| camId      |    int |    true    |  camId 节点  |
| subCamId   |    int |   false    | camId 子节点 |
| createTime | bigint |    true    |   创建时间   |
| updateTime | bigint |    true    |   更新时间   |
| state      |    int |    true    | 状态  0 正常 |




turn_rules 回合规则表
-
| 字段       |       类型 | 是否不为空 |     注释     |
|------------|-----------:|:----------:|:------------:|
| trId       |        int |    true    | id  primary  |
| gamId      |        int |    true    |    游戏id    |
| name       | varchar 30 |   false    |   规则名字   |
| sort       |        int |   false    |   规则排序   |
| createTime |     bigint |    true    |   创建时间   |
| updateTime |     bigint |    true    |   更新时间   |
| state      |        int |    true    | 状态  0 正常 |

occupation 阵营身份表
-
| 字段       |       类型 | 是否不为空 |     注释     |
|------------|-----------:|:----------:|:------------:|
| occId      |        int |    true    | id  primary  |
| camId      |        int |    true    |    阵营id    |
| name       | varchar 30 |    true    |    身份名    |
| describe   |       text |   false    |   身份介绍   |
| createTime |     bigint |    true    |   创建时间   |
| updateTime |     bigint |    true    |   更新时间   |
| state      |        int |    true    | 状态  0 正常 |

skill 技能表
-
| 字段        |       类型 | 是否不为空 |     注释     |
|-------------|-----------:|:----------:|:------------:|
| skiId       |        int |    true    | id  primary  |
| name        | varchar 30 |    true    |    技能名    |
| describe    |       text |   false    |   技能描述   |
| uniqueSkill |       text |    true    |   技能标识   |
| createTime  |     bigint |    true    |   创建时间   |
| updateTime  |     bigint |    true    |   更新时间   |
| state       |        int |    true    | 状态  0 正常 |


occ_ski_relation 身份技能关系表
-
| 字段       |   类型 | 是否不为空 |     注释     |
|------------|-------:|:----------:|:------------:|
| osrId      |    int |    true    | id  primary  |
| occId      |    int |    true    |  阵营身份Id  |
| skiId      |    int |    true    |    技能Id    |
| createTime | bigint |    true    |   创建时间   |
| updateTime | bigint |    true    |   更新时间   |
| state      |    int |    true    | 状态  0 正常 |


<!-- redis 数据表 -->

game_room 游戏房间表
-
| 字段       |       类型 | 是否不为空 |          注释          |
|------------|-----------:|:----------:|:----------------------:|
| grId       |        int |    true    |      id  primary       |
| name       | varchar 20 |    true    |         房间名         |
| gamId      |        int |    true    |         游戏id         |
| gameNum    |        int |    true    |        游戏人数        |
| isReferee  |        bit |    true    | 是否需要裁判 0-否 1-是 |
| createTime |     bigint |    true    |        创建时间        |
| updateTime |     bigint |    true    |        更新时间        |
| state      |        int |    true    |      状态  0 正常      |

game_room_user 房间用户关联表
-
| 字段        |   类型 | 是否不为空 |         注释         |
|-------------|-------:|:----------:|:--------------------:|
| gruId       |    int |    true    |     id  primary      |
| grId        |    int |    true    |      游戏房间id      |
| userId      |    int |    true    |        用户id        |
| isHomeowner |    bit |    true    | 是否是房主 0-否 1-是 |
| createTime  | bigint |    true    |       创建时间       |
| updateTime  | bigint |    true    |       更新时间       |
| state       |    int |    true    |     状态  0 正常     |