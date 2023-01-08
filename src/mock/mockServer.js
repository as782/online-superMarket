// 引入模拟数据的插件
import Mock from 'mockjs'

// Home模块的商品楼层 he轮播图的数据
import floor from '@/mock/floor.json'
import banner from '@/mock/banner.json'

//第一个参数是请求地址，第二个请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })