// 订单页面的数据
import { reqAddressInfo, reqShopInfo, reqSubmitOrder, reqPayInfo, reqPayResult, reqMyOrderList } from "@/api";
const state = {
    address: [],
    orderinfo: [],
    payId: ''
}
const actions = {
    //获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        // console.log(result.data);
        if (result.code == 200) {
            commit('GETUSRADDRESS', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取订单信息
    async getShopInfo({ commit }) {
        let result = await reqShopInfo();
        // console.log(result.data);
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data)

        } else {
            console.log('获取订单faile');
            return Promise.reject(new Error(result.message));
        }
    },
    // 提交订单:tradeNO 交易编码   data:付款人信息
    async submitInfo({ commit }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit('SUBMITINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
}
const mutations = {
    GETUSRADDRESS(state, address) {
        state.address = address;
    },
    GETSHOPINFO(state, info) {
        state.orderinfo = info;
    },
    SUBMITINFO(state, id) {
        state.payId = id;
    }
}
const getters = {

}


export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})