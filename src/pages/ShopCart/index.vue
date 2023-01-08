<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="(item.isChecked == 1)"
              @change="updataChecked(item, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(item, 'mins', -1)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt"
              @change="handler(item, 'itxt', $event.target.value)">
            <a href="javascript:void(0)" class="plus" @click="handler(item, 'plus', 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ (item.skuNum * item.skuPrice) }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteShopData(item)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="(isAllSelect && cartInfoList.length != 0)"
          @click="updateCheckedState($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectShop()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ totalPrice.n }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice.sum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  mounted() {
    //挂载完毕，派发请求购物车数据
    this.getShopData()
  },
  methods: {
    // 派发请求购物车数据
    getShopData() {
      this.$store.dispatch('shopcart/getCartData');
    },
    //cart是确定是那个产品，type区分是加减还是输入，num,加减传递的是差值，输入是最终值。
    //点击事件需要节流操作，防止快点击。
    handler: throttle(async function (cart, type, disNum) {

      // 使用Switch
      switch (type) {
        //减法需要先判断是否大于1，大于1就传递差值可以减，最小是1，传递差值为零
        case "mins": disNum = cart.skuNum > 1 ? -1 : 0; break;
        case "plus": disNum = 1; break;
        case 'itxt':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //正常情况，改变后的值减去原有的值。
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        //将变化后的数据，带上发送给服务器,改变store中的数据
        await this.$store.dispatch('detail/addShopData', { iukid: cart.skuId, iukNum: disNum });
        //同时需要请求，更新购物车的数据
        this.getShopData();
      } catch (error) {
        console.log(error.message);
      }
    }, 1000),
    //删除一个商品
    async deleteShopData(cart) {
      try {
        await this.$store.dispatch('shopcart/deleteShopCartData', cart.skuId)
        this.getShopData()
      } catch (error) {
        console.log(error.message)
      }
    },
    //改变选中单个状态
    async updataChecked(cart, event) {
      let isc = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch('shopcart/updataIsChecked', { skuId: cart.skuId, isChecked: isc });
        this.getShopData();
      } catch (error) {
        console.log(error.message)
      }
    },
    //改变全部的选中状态
    async updateCheckedState(event) {
      //判断全选框的状态
      let isAllCheck = event.target.checked ? '1' : '0';
      //派发action 
      try {
        await this.$store.dispatch('shopcart/updateCheckedState', isAllCheck);
        this.getShopData();
      } catch (error) {
        console.log(error.message);
      }
    },
    //删除选中的商品
    async deleteSelectShop() {
      try {
        await this.$store.dispatch('shopcart/deleteSelectShop');
        this.getShopData();
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    //购物车详细数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //计算中总价
    totalPrice() {
      let sum = 0, n = 0;

      this.cartInfoList.forEach(item => {

        if (item.isChecked == 1) {
          n++;
          sum += item.skuPrice * item.skuNum;

        }

      });
      return { sum, n };
    },
    //判断底部全选是否选中
    isAllSelect() {
      //every() 只要有一个不符合条件就为 false (一假即假)
      return this.cartInfoList.every(item => item.isChecked == 1);
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;


        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;


          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;


          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;


          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;


          a {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>