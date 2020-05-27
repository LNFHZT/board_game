import koa, { Context } from 'koa';
import Router from 'koa-router';
import path from 'path';
import * as fs from 'fs';
import { MiddleWare, REQUEST_BODY } from './decorator/router_decrator';
import { factory } from './decorator/factory';
export default class App {
    private app: koa;
    private globalRouter: Router;
    static controller: string;
    static service: string;
    static dao: string;
    static plugins: Array<any>;
    constructor() {
        this.app = new koa();
        this.globalRouter = new Router();
        this.app.on('error', (err) => {
            throw err;
        });
        App.plugins.forEach(item => {
            this.app.use(item);
        })

        this.loadComponents([
            path.join(__dirname, App.controller),
            path.join(__dirname, App.service),
            path.join(__dirname, App.dao)
        ]);
    }

    // 注册组件
    private loadComponents(componentPaths: string[]): void {
        for (const componentPath of componentPaths) {
            const files = fs.readdirSync(componentPath);
            files.forEach((file) => {
                const newFilePath = path.join(componentPath, file);
                if (fs.statSync(newFilePath).isDirectory()) {
                    return this.loadComponents([newFilePath]);
                }

                const component = require(newFilePath);
                const proto = component.default.prototype;

                if (proto.injectName) {
                    factory[proto.injectName] = new component.default();
                } else {
                    this.registerRouters(proto);
                }

            }
            );
        }
    }

    // 注册路由
    private registerRouters(controllerProto: any): void {
        if (!controllerProto) {
            return;
        }

        const proto = controllerProto;
        const prefix = proto.path;
        const middleWares: MiddleWare[] = proto.middleWares;

        const properties = Object.getOwnPropertyNames(proto);

        properties.forEach((property) => {
            if (proto[property] && proto[property].subPath) {
                const fullPath = (prefix + proto[property].subPath).replace(/\/{2,}/g, '/');
                const method = proto[property].requestMethod;

                // 累加中间件
                const fullMiddleWares: MiddleWare[] = [];
                if (middleWares) {
                    fullMiddleWares.concat(middleWares);
                }
                if (proto[property].middleWares) {
                    fullMiddleWares.concat(proto[property].middleWares);
                }

                const router = new Router();
                // logger.info(`add url:${fullPath}`);
                const asyncMethod = async (context: Context) => {

                    const paramList = proto[property].paramList;
                    const args: any = [];
                    if (paramList) {

                        // 参数绑定
                        const paramKeys = Object.getOwnPropertyNames(paramList);
                        paramKeys.forEach((paramName) => {
                            const index = paramList[paramName];
                            args[index] = paramName === REQUEST_BODY ?
                                JSON.parse(JSON.stringify(context.request.body))
                                : context.query[paramName] || context.params[paramName];
                        });
                    }
                    context.body = await proto[property].apply(proto, args);

                };

                // 添加中间件
                if (fullMiddleWares) {
                    router.use(...fullMiddleWares);
                }
                // @ts-ignore
                router[method](fullPath, asyncMethod);
                this.globalRouter.use(router.routes());
                this.globalRouter.use(router.allowedMethods());
            }
        });

    }

    public listen(port: number): void {
        console.log('-----------------start---------------');
        console.log(`http://localhost:${port}`);
        this.app.listen(port);
    }

} 