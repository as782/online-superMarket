//关于Search的数据管理
import { reqProductList } from '@/api'
const state = {
    searchList: {}
}
const getters = {
    // 返回品牌列表
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    // 返回属性列表
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    //  //获取searchList中的goodsList商品列表
    goodsList(state) {
        return state.searchList.goodsList || []
    }

}
const actions = {
    getSearchList({ commit }, Obj) {
        reqProductList(Obj).then(
            response => {
                if (response.code == 200) {
                    commit('GETSEARCHLIST', response.data)
                }
            },
            error => {
                console.log('getSearchList失败', error.message)
            }
        )
    }
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value
    }
}


export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})