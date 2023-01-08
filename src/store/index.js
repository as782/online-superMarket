//Vuex组件状态管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//引入Home模块和Search模块
import search from './search'
import home from './home'
import detail from './detail'
import shopcart from './shopcart'
import login from './login'
import reg from './reg'
import trade from './trade'

export default new Vuex.Store({
    //配置模块
    modules: {
        search,
        home,
        detail,
        shopcart,
        login,
        reg, trade
    }
})