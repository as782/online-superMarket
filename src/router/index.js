import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'

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

export default new VueRouter({
    routes,
    //跳转路的滚轮位置调整
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

