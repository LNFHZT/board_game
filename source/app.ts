import koa from 'koa';
// import requireDirectory from 'require-directory';
// import Router from 'koa-router';
const app = new koa();
console.log(global);
// // 将所有的路由加载上,自动加载代码
// const modules = requireDirectory(module, './router/', {
//     visit: (obj: any) => {
//         console.log(obj);
//         if (obj instanceof Router) {
//             console.log(obj);
//             //@ts-ignore
//             app.use(obj.routes(), obj.allowedMethods())
//         }
//     }
// })

// console.log('-----------------start---------------');
// console.log(`http://localhost:3000`);
// app.listen(3000);

// import App from './lib/application';

// const app = new App();

// x-response-time
app.use(async (ctx: any, next) => {
    const start = Date.now();
    console.log('------1---------');
    await next();
    console.log('------2---------');

    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx: any, next) => {
    const start = Date.now();
    console.log('------3--------');

    await next();
    console.log('------4---------');

    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(async (ctx: any, next) => {
    console.log('------5--------');

    await next();
    console.log('------6---------');

});

// response
app.use(async (ctx: any) => {
    console.log('------7---------');
    ctx.body = ctx.response.status;
});


app.listen(3000);