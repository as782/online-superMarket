<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-show="!userData">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link class="register" to="/register">免费注册</router-link>

                    </p>
                    <p v-show="userData">
                        <span>欢迎！</span>
                        <a href="javascript:;">{{ userData }}</a>
                        &nbsp;
                        <a href="javascript:;" @click="Logout()">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo" title="尚品汇">
                    <!-- <img src="@/assets/icons.png" alt=""> -->
                </router-link>
            </h1>

            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" v-model="keyword" id="autocomplete" class="input-error input-xxlarge" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>

</template>

<script>
export default {
    name: 'Headers',
    mounted() {
        //挂载后就绑定清除keyword的事件在$bus上,
        this.$bus.$on("clear", this.clear)

    },
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        //点击搜索后发送请求
        goSearch() {
            // 字符串写法
            // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toLocaleLowerCase())
            //模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toLocaleLowerCase()}`)
            let location = {
                name: 'search',
                params: {
                    keyword: this.keyword || undefined,
                }
            }
            if (this.$route.query) {
                //如果query参数有就加上
                location.query = this.$route.query
            }
            this.$router.push(location)
        },
        // 用于在其他组件可以清除keyword
        clear() {
            this.keyword = "";
        },
        //登出
        async Logout() {
            try {
                //退出清除token和vuex的存储
                await this.$store.dispatch('login/userLogout');
                //退出后回到Home
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.log(error.message);
            }

        }

    },
    computed: {
        userData() {
            return this.$store.state.login.userinfo.name;
        }
    }

}
</script>

<style scoped>
.outer .header>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
}

.outer .header>.top .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.outer .header>.top .container .loginList {
    float: left;
}

.outer .header>.top .container .loginList p {
    float: left;
    margin-right: 10px;
}

.outer .header>.top .container .loginList p .register {
    border-left: 1px solid #b3aeae;
    padding: 0 5px;
    margin-left: 5px;
}

.outer .header>.top .container .typeList {
    float: right;
}

.outer .header>.top .container .typeList a {
    padding: 0 10px;
}

.outer .header>.top .container .typeList a+a {
    border-left: 1px solid #b3aeae;
}

.outer .header>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.outer .header>.bottom .logoArea {
    float: left;
}

.outer .header>.bottom .logoArea .logo {
    width: 175px;
    height: 55px;
    margin: 36px 45px;
    background: url(@/assets/images/icons.png) -365px 0px no-repeat;
    display: block;
}

.outer .header>.bottom .logoArea .logo img {
    width: 175px;
    margin: 25px 45px;
}

.outer .header>.bottom .searchArea {
    float: right;
    margin-top: 35px;
}

.outer .header>.bottom .searchArea .searchForm {
    overflow: hidden;
}

.outer .header>.bottom .searchArea .searchForm input {
    box-sizing: border-box;
    width: 490px;
    height: 32px;
    padding: 0px 4px;
    border: 2px solid #ea4a36;
    float: left;
}

.outer .header>.bottom .searchArea .searchForm input:focus {
    outline: none;
}

.outer .header>.bottom .searchArea .searchForm button {
    height: 32px;
    width: 68px;
    background-color: #ea4a36;
    border: none;
    color: #fff;
    float: left;
    cursor: pointer;
}

.outer .header>.bottom .searchArea .searchForm button:focus {
    outline: none;
}
</style>