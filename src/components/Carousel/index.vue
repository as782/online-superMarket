<template>
    <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(list, index) in itemList" :key="index">
                <img :src="list.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" id="ll"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
    name: 'Carousel',
    props: ['itemList'],
    watch: {
        itemList: {
            handler() {
                //prop中的数据不会改变
                immediate: true,
                    this.$nextTick(() => {
                        // console.log('初始化swiper实例，DOM结构要完整')
                        Swiper.use([Navigation, Pagination, Autoplay])
                        // Swiper6
                        // 出现坑的最大原因是：
                        // 1.在第六版导入只能导入swiper核心内容，而部分组件效果如分页器需要单独导入
                        new Swiper('.swiper-container', {
                            loop: true,
                            autoplay: true,
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        })
                    });
            }
        }
    }
}
</script>

<style>

</style>