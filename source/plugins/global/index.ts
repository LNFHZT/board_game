import { Resource, Service, Repository } from '../decorator/factory';
import { Controller, RequestMapping, RequestParam, PathVariable, RequestBody } from '../decorator/router_decrator';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

let decorator = {
    Resource,
    Service,
    Repository,
    Controller,
    RequestMapping,
    RequestParam,
    PathVariable,
    RequestBody,
    Entity,
    PrimaryGeneratedColumn,
    Column
}


/**
 * 将修饰器方法全局注册
 */
Object.keys(decorator).forEach(item => {
    // @ts-ignore
    global[item] = decorator[item];
})
