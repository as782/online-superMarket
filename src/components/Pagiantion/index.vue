<template>
    <div class="fr page">
        <div class="sui-pagination clearfix">
            <ul>
                <li class="prev " :class="{ disabled: PageNo == 1 }">
                    <button :disabled="PageNo == 1" @click="goPage(PageNo - 1)">«上一页</button>
                </li>
                <li v-if="startAndEndPage[0] > 1" @click="goPage(1)"><a>1</a></li>
                <li class="dotted" v-show="startAndEndPage[0] > 1"><span>...</span></li>
                <li :class="{ active: PageNo == i }" v-for="i, index in startAndEndPage" :key="index"
                    @click="goPage(i)">
                    <a>{{ i }}</a>
                </li>

                <li class="dotted" v-show="startAndEndPage.slice(-1) < totalPages"><span>...</span></li>
                <li v-if="startAndEndPage.slice(-1) < totalPages" @click="goPage(totalPages)">
                    <a>{{ totalPages }}</a>
                </li>
                <li class="next" :class="{ disabled: PageNo == totalPages }">
                    <button :disabled="PageNo == totalPages" @click="goPage(PageNo + 1)">下一页»</button>
                </li>
            </ul>
            <div><span>共&nbsp;{{ total }}&nbsp;条</span></div>
        </div>
    </div>
</template>
            
<script>
export default {
    name: "Pagiantion",
    //pageNo当前页，total总数，pageSize每页多少个,continues连续的页码数。
    props: ['PageNo', 'total', 'pageSize', 'continues'],
    computed: {
        // 计算总页数
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
        //计算连续分页的开始页和结束页
        startAndEndPage() {
            let start = 0, end = 0;

            // 当连续的页码数大于页码总数时
            if (this.continues > this.totalPages) {
                start = 1;
                end = this.totalPages;
            } else {
                // 页码总数大于需要连续展示的页码
                start = this.PageNo - parseInt(this.continues / 2);
                end = this.PageNo + parseInt(this.continues / 2);
                if (start < 1) {
                    //开头
                    start = 1;
                    end = this.continues;
                }
                if (end > this.totalPages) {
                    start = this.totalPages - this.continues + 1
                    end = this.totalPages;
                }
            }
            return Array.from(new Array(end + 1).keys()).slice(start)
        }
    },
    methods: {

        //触发自定义事件，跳转到相应页面
        goPage(i) {
            this.$emit('goPagenNo', i)
        }
    }
}
</script>

<style  lang="less" scoped>
.page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    margin: 0 auto;

    .sui-pagination {
        display: flex;
        justify-content: space-between;
        margin: 18px 0;

        ul {
            vertical-align: middle;
            margin: 0 auto;

            li {
                width: 20px;
                height: 20px;
                margin-left: 12px;
                line-height: 18px;
                display: inline-block;

                button {
                    border: 1px solid rgba(212, 212, 212, 0.999);
                }

                a {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    text-align: center;
                    font-size: 12px;
                    cursor: pointer;
                    color: #333;

                    &:hover {
                        background-color: rgba(61, 111, 250, 0.337);
                        color: #f6f6f6;
                        border-color: rgb(7, 86, 255);
                    }
                }


                &.active {
                    a {
                        background-color: rgb(86, 114, 255);
                        color: #f6f6f6;
                        border-color: rgb(43, 110, 255);
                        cursor: default;
                    }
                }

                &.prev {
                    width: 60px;

                    button {
                        background-color: #fafafa;

                        &:hover {
                            color: #fff;
                            background-color: rgb(49, 109, 239);
                        }
                    }
                }

                &.disabled {
                    button {
                        color: #999;
                        cursor: default;
                    }

                }

                &.dotted {
                    span {
                        color: #333;
                    }
                }

                &.next {
                    width: 60px;


                    button {
                        background-color: #ffffff;

                        &:hover {
                            color: #fff;
                            background-color: rgb(49, 109, 239);
                        }
                    }


                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
        }
    }
}
</style>