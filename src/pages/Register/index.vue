<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <form>
        <div class="content  ">
          <label>手机号:</label>
          <input type="text" placeholder="请输入你的手机号" v-model="phone">
          <span class="error-msg">错误提示信息</span>
        </div>
        <div class="content">
          <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button class="btn" @click.prevent="reqCodeData()">获取验证码</button>
          <span class="error-msg">错误提示信息</span>
        </div>
        <div class="content">
          <label>登录密码:</label>
          <input type="text" placeholder="请输入你的登录密码" v-model="password">
          <span class="error-msg">错误提示信息</span>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <input type="text" placeholder="请输入确认密码" v-model="password">
          <span class="error-msg">错误提示信息</span>
        </div>
        <div class="controls">
          <input name="m1" type="checkbox" checked>
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">错误提示信息</span>
        </div>
      </form>
      <div class="btn">
        <button @click="completeReg()">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
    }
  },
  methods: {
    //点击获取验证码
    async reqCodeData() {
      // let { iphone, code, password, password1 } = this;
      //判断是否有手机号码。
      if (this.phone) {
        try {
          let reC = await this.$store.dispatch('reg/reqCode', this.phone);
          alert('你的验证码:' + reC.data + '\n' + '请勿泄露！');
          this.code = reC.data;
        } catch (error) {
          console.log(error.message);
        }
      } else {
        alert('请先输入手机号！')
      }

    },
    //完成注册
    async completeReg() {
      let { phone, code, password } = this;
      try {
        //注册请求需要一个对象参数,对象的属性名为phone,password,code
        //等待返回true,并且跳转到登录路由。
        await this.$store.dispatch('reg/completeRegister', { phone, password, code });
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      .btn {
        width: 100px;
        margin-left: 10px;
        background-color: rgba(165, 154, 228, 0.15);
        border: 1px solid rgb(201, 201, 201);

      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>