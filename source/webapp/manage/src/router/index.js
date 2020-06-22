import Vue from 'vue';
import Router from 'vue-router';
import router from './router';
Vue.use(Router);

let base = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录' }
    },
];

base = base.concat(router);
base.push({
    path: '*',
    redirect: '/404'
})
export default new Router({
    routes: base
});
