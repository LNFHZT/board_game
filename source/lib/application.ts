import koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import * as fs from 'fs';
import { MiddleWare, REQUEST_BODY } from '../decorator/RouterDecrator';
export default class App {
    private app: koa;
    private globalRouter: Router;
    constructor() {
        this.app = new koa();
        this.globalRouter = new Router();
        this.app.use(bodyParser());
        this.loadController(path.join(__dirname, '../controller'));
    }

    private loadController(filePath: string): void {
        const files = fs.readdirSync(filePath);
        files.forEach((file) => {
            const newFilePath = path.join(filePath, file);
            // 判断是否是文件夹
            if (fs.statSync(newFilePath).isDirectory()) {
                this.loadController(newFilePath);
            } else {
                const controller = require(newFilePath);
                this.registerRouter(controller);
            }
        }
        );
    }

    private registerRouter(controller: any): void {
        if (!controller) {
            return;
        }

        const proto = controller.default.prototype;
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
                                // @ts-ignore
                                JSON.parse(JSON.stringify(context.request.body)) : context.query[paramName];
                        });
                    }
                    context.body = await proto[property].apply(proto, args);

                };

                // 添加中间件
                if (middleWares) {
                    router.use(...middleWares);
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