import { Context } from 'koa';
export default async function (context: Context, next: () => Promise<any>) {

    await next();
    context.response.status = 200;
    context.response.body = {
        data: context.body,
        meta: {
            serverTime: Date.now(),
            code: 200
        },
    };
}