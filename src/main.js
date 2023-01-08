import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
Vue.config.productionTip = false
//引入TypeNav
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagiantion from '@/components/Pagiantion'
//注册全局组件TepeNav,Carousel,Pagination
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagiantion.name, Pagiantion)

//Vux组件状态管理
import store from '@/store'

//执行mock 模拟后端数据
import '@/mock/mockServer'
//全局引入Swiper插件的样式
import 'swiper/swiper-bundle.min.css'

new Vue({
  render: h => h(App),
  //安装全局事件总线,$bus就是当前应用的vm
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
