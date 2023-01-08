// 关于注册的数据
//导入axios 请求验证码rqRegCode，参数 {phone}  请求注册rqRegAccount   参数phone，password，code
import { rqRegCode, rqRegAccount } from '@/api';

const state = {}
const getters = {}
const actions = {
    //获取验证码的请求
    async reqCode({ commit }, phone) {
        let result = await rqRegCode(phone);
        if (result.code == 200) {
            return result;
        } else {
            return Promise.reject(new Error('验证码请求失败，faile'));
        }
    },
    async completeRegister({ commit }, data) {
        let result = await rqRegAccount(data);
        if (result.code == 200) {
            return result.ok;
        } else {
            return Promise.reject(new Error('验证码请求失败，faile'));
        }
    }
}
const mutations = {}



export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})