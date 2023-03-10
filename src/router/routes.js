
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/trade'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import teamOrder from '@/pages/Center/teamOrder'
// import Communication from '@/pages/Communication'
import Pay from '@/pages/pay'
import PaySuccess from '@/pages/paySuccess'

export default [
    { path: '/', redirect: '/home' },
    //主页路由
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { isShowFooter: true }
    },
    // 搜索路由
    {
        name: 'search',
        path: '/search/:keyword?',//加个？表示这个params参数可穿可不传
        component: Search,
        meta: { isShowFooter: true }
    },
    //添加Detail路由
    {
        name: 'detail',
        path: '/detail/:iukid',
        component: Detail,
        meta: { isShowFooter: true }
    },
    //加入购物车成功路由
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { isShowFooter: true }
    },
    //购物车路由
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { isShowFooter: false }
    },
    //登录路由
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { isShowFooter: false }
    },
    //z注册路由
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { isShowFooter: false }
    },
    //订单路由
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isShowFooter: false }
    },
    //支付页面路由
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { isShowFooter: true },
        //独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                alert('先去买点东西吧！');
                next(from.path);
            }
        }
    },
    //支付成功
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isShowFooter: true },
        //独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next();
            } else {
                alert('先去买点东西吧！')
                next(from.path);
            }
        }

    },
    //
    {
        name: 'center'
        ,
        path: '/center'
        ,
        component: Center
        ,
        meta: { isShowFooter: true },
        children: [
            // { path: '/', redirect: 'myorder' },
            { name: 'myorder', path: 'myorder', component: myOrder, meta: { isShowFooter: true }, },
            { name: 'teamorder', path: 'teamorder', component: teamOrder, meta: { isShowFooter: true }, },
        ]
    },
    //Communication
    // {
    //     name: 'communication'
    //     ,
    //     path: '/communication'
    //     ,
    //     component: Communication
    //     ,
    //     meta: { isShowFooter: true }
    // }
]