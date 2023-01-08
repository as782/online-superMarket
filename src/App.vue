<template>
  <div id="app" class="outer">
    <!-- 页面头部 -->
    <Headers></Headers>

    <!-- 主体部分展示区 -->
    <router-view></router-view>
    <!-- 页脚 -->
    <Footers v-show="($route.meta.isShowFooter == true)"></Footers>
  </div>
</template>

<script>
import Headers from './components/Headers';
import Footers from './components/Footers';

export default {

  name: 'App',
  components: {
    Footers,
    Headers
  },
  mounted() {
    //App组件挂载完毕就请求数据,typeNav会多次挂载，App只挂一次。
    this.$store.dispatch('home/cateGoryList')
  }
}
</script>

<style>
.outer .footer {
  background-color: #eaeaea;
}

.outer .footer .footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.outer .footer .footer-container .footerList {
  padding: 20px;
  border-bottom: 1px solid #e4e1e1;
  border-top: 1px solid #e4e1e1;
  overflow: hidden;
  padding-left: 40px;
}

.outer .footer .footer-container .footerList .footerItem {
  width: 16.6666667%;
  float: left;
}

.outer .footer .footer-container .footerList .footerItem h4 {
  font-size: 14px;
}

.outer .footer .footer-container .footerList .footerItem .footerItemCon li {
  line-height: 18px;
}

.outer .footer .footer-container .footerList .footerItem:last-child img {
  width: 121px;
}

.outer .footer .footer-container .copyright {
  padding: 20px;
}

.outer .footer .footer-container .copyright .helpLink {
  text-align: center;
}

.outer .footer .footer-container .copyright .helpLink li {
  display: inline;
}

.outer .footer .footer-container .copyright .helpLink li .space {
  border-left: 1px solid #666;
  width: 1px;
  height: 13px;
  background: #666;
  margin: 8px 10px;
}

.outer .footer .footer-container .copyright p {
  margin: 10px 0;
  text-align: center;
}
</style>
