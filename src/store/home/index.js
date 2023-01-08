//关于Home的数据管理、

//导入axios,二次封装后axios
import { reqCategoryList, reqBannerList, reqFloors } from '@/api'
const state = {
    //存放三级列表数据
    categorylist: [],
    //存放Home中轮播图的数据
    bannerList: [],
    //存放Floor中的图片
    floorList: []
}
const actions = {
    //发送axios请求，向服务器请求三级列表数据
    cateGoryList(context) {
        reqCategoryList().then(
            response => {
                if (response.code == 200) {
                    //    如果请求成功就提交数据
                    let list = response.data.slice(0, -2)
                    context.commit('GETCATEGORYLIST', list)
                } else {
                    console.log(response.code);
                }
            },
            error => {
                console.log('cateGoryList失败', error.message)
            })
    },

    //发送axios请求，请求利用Mock，模拟的数据 ,获取轮播图的列表
    getBannerList(context) {
        // console.log('Ajax开始请求bannner数据,此时需要此数据遍历生成的Dom还未生成')
        reqBannerList().then(
            response => {
                if (response.code == 200) {
                    //    如果请求成功就提交数据
                    let list = response.data
                    context.commit('GETBANNERLIST', list)
                } else {
                    console.log(response.code);
                }
            },
            error => {
                console.log('bannerList请求失败', error.message)
            })
    },
    //发送axios请求，请求利用Mock，模拟的数据 ,获取轮播图的列表
    getFloorList(context) {
        reqFloors().then(
            response => {
                if (response.code == 200) {
                    //    如果请求成功就提交数据
                    let list = response.data
                    context.commit('GETFLOORLIST', list)
                } else {
                    console.log(response.code);
                }
            },
            error => {
                console.log('floorList请求失败', error.message)
            })
    },

}

const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categorylist = value
    },
    GETBANNERLIST(state, value) {
        // console.log('修改state中bannner数据，banner数据请求完毕依赖此数据的Dom可以生成')
        state.bannerList = value
    },
    GETFLOORLIST(state, value) {
        state.floorList = value
    },
}
const getters = {}

export default ({
    namespaced: true,
    state,
    actions,
    mutations,
    getters
})