//管理Detail组件中的数据
import { reqCartData, reqDeleteShopCartData, reqUpdataIsCheckedById } from '@/api'
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}
const actions = {
    //获取购物车数据
    async getCartData({ commit }) {
        let result = await reqCartData()
        if (result.code = 200) {
            commit('GETCARTDATA', result.data)
        }
    },
    //删除购物车数据
    async deleteShopCartData({ commit }, iukid) {
        let result = await reqDeleteShopCartData(iukid)
        if (result.code == 200) {
            // 返回删除成功信息，以便让调用组件知晓。
            return result.ok
        } else {
            return Promise.reject(new Error('删除请求失败，faile'));
        }

    },
    //修改选中状态
    async updataIsChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataIsCheckedById(skuId, isChecked);
        if (result.code == 200) {
            // 返回修改成功信息，以便让调用组件知晓。
            return result.ok
        } else {
            return Promise.reject(new Error('删除请求失败，faile'));
        }
    },
    //全选操作
    updateCheckedState({ dispatch, getters }, isAllCheck) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let chceked = isAllCheck == '1' ? '1' : '0';
            let pm = dispatch('updataIsChecked', { skuId: item.skuId, isChecked: chceked })
            PromiseAll.push(pm)
        });
        // Promise.all(PromiseAll)所有promise都成功才返回成功
        return Promise.all(PromiseAll)
    },
    //删除选中的商品
    deleteSelectShop({ dispatch, getters }) {
        let PromiseAll = [];
        //先判断有没有选中的,有就遍历删除
        if (!getters.cartList.cartInfoList.every(item => item.isChecked == '0')) {
            getters.cartList.cartInfoList.forEach(item => {
                //如果商品被选中，将他的ID传递删除它。否则不删
                // let d = item.isChecked ? item.skuId : '';
                if (item.isChecked) {
                    let pm = dispatch('deleteShopCartData', item.skuId)
                    PromiseAll.push(pm)
                }
            });
        } else {
            return true;
        }

        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTDATA(state, value) {
        state.cartList = value
    }
}


export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})