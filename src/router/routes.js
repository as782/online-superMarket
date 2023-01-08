
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/trade'
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
    }
]