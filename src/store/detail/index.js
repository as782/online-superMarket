//管理Detail组件中的数据
import { reqDetialData, reqAddCart } from '@/api'
import { getUUID } from "@/utils/uuid_token"
const state = {
    detailData: {},
    //生成一个不变的id标记游客身份
    uuid_token: getUUID()
}
const getters = {
    // 在计算一个对象的属性时，如果该对象不存在就会有警告，所以计算的返回值还需要或返回一个空对象
    categoryView(state) {
        return state.detailData.categoryView || {}
    },
    // 产品标题，和图片的信息
    skuInfo(state) {
        return state.detailData.skuInfo || {}
    },
    // 产品属性数据
    spuSaleAttrList(state) {
        return state.detailData.spuSaleAttrList || []
    }

}
const actions = {
    //发起请求获取数据后，commit
    getDetailData({ commit }, iukid) {
        reqDetialData(iukid).then(
            response => {
                if (response.code == 200) {
                    commit('GETDETAILDATA', response.data)
                }
            },
            error => {
                console.log('getDetailData失败', error.message)
            }
        )
    },
    //加入购物车请求，返回结果是成功或者失败。
    async addShopData({ commit }, { iukid, iukNum }) {
        let result = await reqAddCart(iukid, iukNum).then()
        // 将的到的promise对象作为addShopData函数的返回值，传递给调用它的地方以便，知道加入成功与否。
        if (result.code == 200) {
            return result.ok
        } else {
            return Promise.reject(new Error('faile'));
        }

    }
}
const mutations = {
    GETDETAILDATA(state, value) {
        state.detailData = value
    }
}


export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})