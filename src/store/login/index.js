// 关于登入的数据
//引入接口登入 rqLoginAccount 参数：phone:string,password:string
import { rqLoginAccount, reqUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    //保存登录令牌token,
    token: getToken(),
    loginData: {},
    userinfo: {}
}
const getters = {}
const actions = {
    //请求登入，参数{phone:xxxx,password:xxxx}
    async reqLoginSystem({ commit }, data) {
        let result = await rqLoginAccount(data);
        if (result.code == 200) {
            commit('REQLOGINSYSTEM', result.data);
            //把token存储到本地
            setToken(result.data.token);
            return result.ok;
        }
        else {
            return Promise.reject(new Error('登入请求失败！'));
            // console.log(Promise.reject(new Error('登入请求失败！')));
        }
    },
    //获取用户信息
    async reqUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('REQUSERINFO', result.data);
            return result.ok;
        }
        else {
            return Promise.reject(new Error('获取用户信息失败！'));

        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('ClEARALLINFO');
            return result.ok;
        }
        else {
            return Promise.reject(new Error('退出失败！'));

        }
    }
}
const mutations = {
    // { nickName: '1234445', name: '1234445', userId: 447, token: 'xxxxxxxxxxxxxxxxxxx' }
    REQLOGINSYSTEM(state, value) {
        state.token = value.token,
            state.loginData = value
    },
    REQUSERINFO(state, value) {
        state.userinfo = value
    },
    //清除用户数据
    ClEARALLINFO(state) {
        state.token = '';
        state.userinfo = {};
        //清除本地token
        removeToken();

    }
}



export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})