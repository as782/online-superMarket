<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="resetIndex()" @mouseenter="showSort()">
                <h2 class="all">全部商品分类</h2>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch($event)">
                        <!-- 一级导航 -->
                        <div class="item bo" v-for="(c1, index) in categorylist" :key="c1.categoryId"
                            :class="{ cur: currentindex == index }">
                            <h3 @mouseover="changIndex(index)">
                                <a :data-category-name="c1.categoryName" :data-category1-id="c1.categoryId">
                                    {{ c1.categoryName }}-{{ index }}
                                </a>
                            </h3>
                            <!-- 二级导航 -->
                            <div class=" item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-category-name="c2.categoryName" :data-category2-id="c2.categoryId">
                                                {{ c2.categoryName }}
                                            </a>
                                        </dt>
                                        <!-- 三级导航 -->
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-category-name="c3.categoryName"
                                                    :data-category3-id="c3.categoryId">
                                                    {{ c3.categoryName }}
                                                </a>
                                            </em>

                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {

    name: "TypeNav",
    data() {
        return {
            currentindex: -1,
            show: true
        }
    },
    methods: {
        changIndex: throttle(function (index) {
            this.currentindex = index
        }, 50),
        //重置标记
        resetIndex() {
            this.currentindex = -1
            //只有在Search组件中才有隐藏效果
            if (this.$route.name == 'search') {
                this.show = false
            }

        },
        // 当鼠标进入时显示子级导航
        showSort() {
            this.show = true
        },
        //跳转到Search路由
        goSearch(event) {

            //获取事件节点
            let element = event.target
            // 解构赋值获取属性值
            //元素上写驼峰，dataset获取全为小写，若要获取驼峰形式，元素上要使用-形式。
            let { categoryName, category1Id, category2Id, category3Id } = element.dataset

            if (categoryName) {

                // 跳转地址
                let location = { name: 'search' }
                //携带数据
                let query = { categoryName: categoryName }
                if (category1Id) {
                    // 添加属性
                    query.category1Id = category1Id
                } else if (category2Id) {
                    query.category2Id = category2Id
                } else {
                    query.category3Id = category3Id
                }
                //整理参数并跳转
                if (this.$route.params) {
                    location.params = this.$route.params

                }
                location.query = query
                this.$router.push(location)

            }
        }
    },
    mounted() {

        //只有在Search组件中才有隐藏效果
        if (this.$route.name == 'search') {
            this.show = false
        }

    },
    computed: {
        ...mapState('home', ['categorylist'])
    }
}

</script>

<style scoped>
.cur {
    background-color: #4364e7;
}

.outer .type-nav {
    border-bottom: 2px solid #e1251b;
}

.outer .type-nav .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
}

.outer .type-nav .container .all {
    width: 210px;
    height: 45px;
    background-color: #e1251b;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
}

.outer .type-nav .container .nav a {
    height: 45px;
    margin: 0 22px;
    line-height: 45px;
    font-size: 16px;
    color: #333;
}

.outer .type-nav .container .sort {
    left: 0;
    top: 45px;
    width: 210px;
    height: 461px;
    position: absolute;
    background: #fafafa;
    z-index: 999;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
    color: #333;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
    display: none;
    position: absolute;
    width: 734px;
    min-height: 460px;
    background: #f7f7f7;
    left: 210px;
    border: 1px solid #ddd;
    top: 0;
    z-index: 9999 !important;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
    float: left;
    width: 650px;
    padding: 0 4px 0 8px;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
    border-top: 1px solid #eee;
    padding: 6px 0;
    overflow: hidden;
    zoom: 1;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
    border-top: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
    float: left;
    width: 54px;
    line-height: 22px;
    text-align: right;
    padding: 3px 6px 0 0;
    font-weight: 700;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
    float: left;
    width: 415px;
    padding: 3px 0 0;
    overflow: hidden;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
    float: left;
    height: 14px;
    line-height: 14px;
    padding: 0 8px;
    margin-top: 5px;
    border-left: 1px solid #ccc;
}

.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
    display: block;
}
</style>