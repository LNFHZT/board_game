import { Context } from 'koa';
export default async function (context: Context, next: () => Promise<any>) {
    try {
        await next();
    } catch (error) {
        context.app.emit('error', error, context);
    }
}