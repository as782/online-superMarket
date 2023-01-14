<template>
  <div>
    <!--三级导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 点击分类产生的 -->
            <li class="with-x" v-if="reqdata.categoryName">
              {{ reqdata.categoryName }}
              <i @click="removeCategoryName()">×</i>
            </li>
            <!-- 搜索产生的 -->
            <li class="with-x" v-if="reqdata.keyword">
              {{ reqdata.keyword }}
              <i @click="removeKeyword()">×</i>
            </li>
            <!-- 点击品牌产生的面包屑导航 -->
            <li class="with-x" v-if="reqdata.trademark">
              {{ reqdata.trademark.split(':')[1] }}
              <i @click="removeTrademark()">×</i>
            </li>
            <!-- 点击属性产生的 -->
            <li class="with-x" v-for="(prop, index) in reqdata.props" :key="index">
              {{ prop.split(':')[1] }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @brandInfo="brandInfo" @attrInfo="attrInfo" />

        <!--details 商品详情-->
        <div class="details clearfix">
          <!-- 导航 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: typeWhat }">
                  <!-- 用1,2区分综合排序还是价格 -->
                  <a @click="changRank(1)">综合
                    <span class="iconfont" :class="[rankWhat ? 'icon-paixu' : 'icon-paixu1']" v-show="typeWhat"></span>
                  </a>
                </li>
                <li :class="{ active: !typeWhat }">
                  <a @click="changRank(2)">价格
                    <span class="iconfont " :class="[!rankWhat ? 'icon-paixu' : 'icon-paixu1']"
                      v-show="!typeWhat"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <Pagiantions @goPagenNo="goPagenNo" :PageNo="reqdata.pageNo" :total="searchList.total"
            :pageSize="reqdata.pageSize" :continues="5">
          </Pagiantions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SearchSelector from './SearchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  beforeMount() {
    this.reqdata = { ...this.reqdata, ...this.$route.query, ...this.$route.params }
    // Object.assign(this.reqdata, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getSearchData()
  },
  data() {
    return {
      reqdata: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 3,
        "props": [],
        "trademark": ""
      }
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    //获取search仓库下的goodsList
    ...mapGetters('search', ['goodsList']),
    ...mapState('search', ['searchList']),
    // order参数有四种：1:desc,1:asc;  2:desc,2:asc 1是综合排序， 2表示价格排序
    typeWhat() {
      return this.reqdata.order.split(':')[0] == 1 ? true : false

    },
    rankWhat() {
      return this.reqdata.order.split(':')[1] == 'desc' ? true : false

    }
  },
  methods: {
    //带上关键字，和分类，派发搜索请求
    getSearchData() {
      //发请求前整理参数
      this.reqdata = { ...this.reqdata, ...this.$route.query, ...this.$route.params }
      this.$store.dispatch('search/getSearchList', this.reqdata)
      //将id清空,其他的合并时有重名属性会覆盖更新,可以赋值为空串，但设置为undifined，不会带给服务器。
      this.reqdata.category1Id = undefined
      this.reqdata.category2Id = undefined
      this.reqdata.category3Id = undefined
    },
    //回调函数，----添加品牌面包屑
    brandInfo(brand) {
      // console.log(brand);
      //重新整理参数
      this.reqdata.trademark = `${brand.tmId}:${brand.tmName}`
      //发起请求,但是地址栏的没有任何变化如何解决。
      this.getSearchData()
    },
    //回调函数，----添加属性面包屑
    attrInfo({ attrId, attrName }, item) {
      //要带参数props是一个数组,格式["属性ID:属性值:属性名"] 
      let prop = `${attrId}:${item}:${attrName}`
      //在加入数组前需要判断是否已经存在
      if (this.reqdata.props.indexOf(prop) == -1) {
        this.reqdata.props.push(prop)
      }
      // console.log(this.reqdata.props);
      this.getSearchData()

    },
    //删除面包屑导航1，（点击分类导航产生）
    removeCategoryName() {
      this.reqdata.categoryName = ''
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    //删除面包屑导航2，（搜索框关键字产生）
    removeKeyword() {
      //清空reqdata中的keyword和搜索框中keyword
      this.reqdata.keyword = ''
      this.$bus.$emit("clear")
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    //删除面包屑导航3，（点击品牌栏产生的）
    removeTrademark() {
      this.reqdata.trademark = ''
      this.getSearchData()
    },
    //删除面包屑导航4，（点击品牌栏下的属性产生的）
    removeProp(index) {
      //index确定要删除那个,splice()从index开始删除1个
      this.reqdata.props.splice(index, 1)
      this.getSearchData()
    },
    //flag=1综合排序，flag=2价格排序
    changRank(flag) {
      //此处修改参数，flag=1 or 2 区分两个排序方法，然后判断当前的是升序还是降序，如果当前时升序，再次点击就应该变为降序，最后发起请求
      //保存默认方式，确保切换时排序方式的正确
      let oldOrder = this.reqdata.order
      let oldFlag = oldOrder.split(':')[0]
      let newOrder = ''
      if (flag == oldFlag) {
        newOrder = `${flag}:${this.reqdata.order.split(':')[1] == 'desc' ? 'asc' : 'desc'}`
      } else {
        //不管综合（价格）排序最后的状态是升序还是降序，切换到价格（综合）都应该是默认降序
        newOrder = `${flag}:desc`
      }
      this.reqdata.order = newOrder
      this.getSearchData()
    },
    //回调函数，---分页器跳转到相应页面
    goPagenNo(pgNo) {
      this.reqdata.pageNo = pgNo;
      this.getSearchData()
    }
  },
  // 监听路由地址的变化，其中数据变化就发送请求
  watch: {
    $route: {
      handler() {
        //发起请求
        this.getSearchData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: 255px;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }


    }
  }
}
</style>