import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'
import { removeToken } from '@/utils/token'
// // 重写push和replace方法解决编程导航的报错问题
let originPush = VueRouter.prototype.push
let replace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    //如果有成功或者失败的信息就调用原来的push方法就行
    if (resolve && reject) {
        // call和apply都可以调用函数一次，和篡改上下文一次
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resole, reject) {
    //如果有成功或者失败的信息就调用原来的push方法就行
    if (resole && reject) {
        // call和apply都可以调用函数一次，和篡改上下文一次
        // 
        replace.call(this, location, resole, reject)
    } else {
        replace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    //跳转路的滚轮位置调整
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
});

//全局守卫： 添加前置守卫，
router.beforeEach(async (to, from, next) => {

    //登录后token存在，未登录不存在
    let token = store.state.login.token;
    let name = store.state.login.userinfo.name;
    if (token) {
        //登录后就不能去login页面，
        if (to.path == '/login') {
            next("/home");
            alert('您已经登录！')
        } else {
            //跳转的路由不是login而是{home\search\detail\shopcart}
            if (name) {
                next();
            } else {
                //用户信息不存在
                try {
                    //获取用户信息
                    await store.dispatch('login/reqUserInfo');
                    next();
                } catch (error) {
                    //token 失效，退出清除旧的token
                    // store.dispatch('login/userLogout');
                    // removeToken();

                }
            }
        }
    } else {
        //未登录
        const topath = to.path;
        const paths = [
            '/center/myorder',
            '/center/teamorder',
            '/shopcart',
            '/paysuccess',
            '/pay',
            '/center',
        ]
        if (paths.some(e => { return e === topath })) {

            next(`/login?redict=${topath}`);
            alert('请先登录！')
        } else {
            next();
        }

    }
});

export default router