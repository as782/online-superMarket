<template>

    <div>

        <!-- 商品分类导航 -->
        <TypeNav></TypeNav>
        <!-- 列表 -->
        <ListContainer></ListContainer>
        <!-- 今日推荐 -->
        <TadyRecommend></TadyRecommend>
        <!-- 猜你喜欢 -->
        <Like></Like>
        <!-- 商品排行 -->
        <!-- 楼层 -->
        <Floor :floor="floor" v-for="floor in floors" :key="floor.id"></Floor>
        <Rank></Rank>
        <!-- 品牌 -->
        <Brand></Brand>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ListContainer from '@/pages/Home/ListContainer'
import TadyRecommend from '@/pages/Home/TadyRecommend'
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
export default {
    name: 'Home',
    components: {
        ListContainer,
        Like,
        Brand,
        Rank,
        TadyRecommend,
        Floor
    },
    mounted() {
        //挂载后发起请求
        this.$store.dispatch("home/getFloorList");
        //用户登入跳转Home组件，发起请求获取登入用户的信息
        this.$store.dispatch("login/reqUserInfo");
    },
    computed: {
        ...mapState('home', { floors: 'floorList' })
    }
}
</script>

<style>

</style>