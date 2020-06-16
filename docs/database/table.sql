create table user(
    userId int not null identity(1,1) primary key,
    nickName varchar(30) null ,
    sex bit not null default 0,
    headPortrait varchr(100) null ,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0  
);
comment on table user is '用户表';
comment on column user.userId is '用户id';
comment on column user.nickName is '昵称';
comment on column user.sex is '性别 0-女 1-男';
comment on column user.headPortrait is '头像';
comment on column user.createTime is '创建时间';
comment on column user.updateTime is '更新时间';
comment on column user.state is '状态  0 正常 -1 删除过的用户';

create table wx_user_center(
    wucId int not null identity(1,1) primary key,
    openId varchar(30) not null ,
    userId int not null,
    unionId varchar(30) null,
    info text null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table wx_user_center is "微信用户表";
comment on column wx_user_center.wucId is '微信用户  id';
comment on column wx_user_center.openId is '微信平台openId';
comment on column wx_user_center.userId is '用户id';
comment on column wx_user_center.unionId is '微信用户唯一标识id';
comment on column wx_user_center.info is '微信用户数据';
comment on column wx_user_center.createTime is '创建时间';
comment on column wx_user_center.updateTime is '更新时间';
comment on column wx_user_center.state is '状态 0 正常 -1 删除过的用户';


create table game_type(
    gtId int not null  identity(1,1) primary key,
    name varchar(30) not null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table game_type is '游戏类型表';
comment on column game_type.gtId is '类型Id ';
comment on column game_type.name is '类型名';
comment on column game_type.createTime is '创建时间';
comment on column game_type.updateTime is '更新时间';
comment on column game_type.state is '状态  0 正常 ';

create table game(
    gamId  int not null identity(1,1) primary key,
    gtId int not null,
    name varchar(30) not null ,
    describe text null,
    ruleDescibe text null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table game is '游戏表';
comment on column game.gamId is '游戏id'; 
comment on column game.gtId is '类型id';
comment on column game.name is '游戏名';
comment on column game.describe is '描述';
comment on column game.ruleDescibe is '规则描述';
comment on column game.createTime is '创建时间';
comment on column game.updateTime is '更新时间';
comment on column game.state is '状态  0 正常';

create table camp(
    camId int not null identity(1,1) primary key,
    gamId int not null,
    name varchar(30),
    describe text null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table camp is '阵营表';
comment on column camp.camId is '阵营Id';
comment on column camp.gamId is '游戏id';
comment on column camp.name is '阵营名';
comment on column camp.describe is '阵营描述';
comment on column camp.createTime is '创建时间';
comment on column camp.updateTime is '更新时间';
comment on column camp.state is '状态  0 正常';

create table camp_relation(
    crId int not null identity(1,1) primary key,
    camId int not null,
    subCamId int null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table camp_relation is '阵营关系表';
comment on column camp_relation.crId is '阵营关系Id';
comment on column camp_relation.camId is 'camId 节点';
comment on column camp_relation.subCamId is 'camId 子节点';
comment on column camp_relation.createTime is '创建时间';
comment on column camp_relation.updateTime is '更新时间';
comment on column camp_relation.state is '状态  0 正常';

create table turn_rules(
    trId int not null identity(1,1) primary key,
    gamId int not null,
    name varchar(30) null,
    sort int null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table turn_rules is '回合规则表';
comment on column turn_rules.trId is '回合规则Id';
comment on column turn_rules.gamId is '游戏id';
comment on column turn_rules.name is '规则名字';
comment on column turn_rules.sort is '规则排序';
comment on column turn_rules.createTime is '创建时间';
comment on column turn_rules.updateTime is '更新时间';
comment on column turn_rules.state is '状态  0 正常';

create table occupation(
    occId int not null identity(1,1) primary key,
    camId int not null ,
    name varchar(30) not null 
    describe text null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table occupation is '阵营身份表';
comment on column occupation.occId is '阵营身份Id';
comment on column occupation.camId is '阵营id';
comment on column occupation.name is '身份名';
comment on column occupation.describe is '身份介绍';
comment on column occupation.createTime is '创建时间';
comment on column occupation.updateTime is '更新时间';
comment on column occupation.state is '状态  0 正常';

create table skill(
    skiId int not null identity(1,1) primary key,
    name varchar(30) not null,
    describe text null,
    uniqueSkill text not null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0
);

comment on table skill is '技能表';
comment on column skill.skiId is '技能Id';
comment on column skill.name is '技能名';
comment on column skill.describe is '技能描述';
comment on column skill.uniqueSkill is '技能标识';
comment on column skill.createTime is '创建时间';
comment on column skill.updateTime is '更新时间';
comment on column skill.state is '状态  0 正常';

create table occ_ski_relation(
    osrId int not null identity(1,1) primary key,
    occId int not null ,
    skiId int not null,
    createTime bigint not null,
    updateTime bigint not null,
    state int not null default 0 
);

comment on table occ_ski_relation is '身份技能关系表';
comment on column occ_ski_relation.osrId is '身份技能关系Id';
comment on column occ_ski_relation.occId is '阵营身份Id';
comment on column occ_ski_relation.skiId is '技能Id';
comment on column occ_ski_relation.createTime is '创建时间';
comment on column occ_ski_relation.updateTime is '更新时间';
comment on column occ_ski_relation.state is '状态  0 正常';
