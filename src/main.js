import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
Vue.config.productionTip = false

//引入TypeNav，轮播图，和分页器。
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagiantions from '@/components/Pagiantions'

//ElementUI 
// import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
import { MessageBox } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

//注册全局组件TepeNav,Carousel,Pagination
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagiantions.name, Pagiantions)

//Vux组件状态管理
import store from '@/store'

// 接口全部引入
import * as API from '@/api'

//执行mock 模拟后端数据
import '@/mock/mockServer'

//全局引入Swiper插件的样式
import 'swiper/swiper-bundle.min.css'

new Vue({
  render: h => h(App),
  //安装全局事件总线,$bus就是当前应用的vm
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    //弹窗组件
    Vue.prototype.$alert = MessageBox.alert;

  },
  router,
  store
}).$mount('#app')
