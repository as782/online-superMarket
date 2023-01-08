// 对axios二次封装
import axios from 'axios'
// 引入nprogress 进度条控制
import nprogress from 'nprogress'
// start()进度条开始 done()结束
// 引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'

//创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发送请求时，路轻中会出现'api'
    baseURL: '/api',
    //请求超时的时间    
    timeout: 5000
})

//请求拦截器，在发起请求之前可以被拦截器检测到，可以在请求发出去之前做一些处理。
requests.interceptors.request.use((config) => {
    //config:配置对象，里面有一个重要属性，headers请求头
    //进度条开始
    //存在uuid就带上。
    if (store.state.detail.uuid_token) {
        //在请求头中添加一个字段带给服务器
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if (store.state.login.token) {
        config.headers.token = store.state.login.token;
    }
    nprogress.start()
    return config
})

//响应拦截器，
requests.interceptors.response.use((req) => {
    //c成功就返回数据,返回前可以做处理
    //进度条结束
    nprogress.done()
    return req.data
}, (error) => {
    //响应失败
    return Promise.reject(new Error('faile'))
})

export default requests