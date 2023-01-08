//统一api 管理模块
//引入二次封装的axios
import requests from "./request";
import Mockrequest from "./Mockrequest"
//请求三级导航的数据
// '/api/product/getBaseCategoryList
export const reqCategoryList = () => {
    // aixos返回一个Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//请求一个mock数据，获取轮播图列表
export const reqBannerList = () => {
    // aixos返回一个Promise对象
    return Mockrequest({ url: '/banner', method: 'get' })
}
// 获取首页楼层列表
export const reqFloors = () => {
    return Mockrequest({ url: '/floor', method: 'get' })

}

// 请求搜索页面的数据
//搜索请求需要带一个对象参数（搜索的分类），至少是一个空对象
export const reqProductList = (pramas) => {
    return requests.post('/list', pramas)
}

//请求详情页面的数据，
//请求要带一个参数，点击产品的id
export const reqDetialData = (iukid) => {
    return requests.get(`/item/${iukid}`)
}

//请求加入购物车
//参数两个，产品数量，产品id, /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddCart = (skuId, skuNum) => {
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`);
}
//请求购物车中的数据
export const reqCartData = () => {
    return requests({ url: '/cart/cartList', method: 'get' });
}

//删除购物车的数据
//需要商品的skuid,/api/cart/deleteCart/{skuId}
export const reqDeleteShopCartData = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
}

//修改 商品的选中状态
export const reqUpdataIsCheckedById = (skuId, isChecked) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
}

//注册账号的接口
// /api/user/passport/register POST 
// 参数phone，password，code
export const rqRegAccount = (info) => {
    return requests({ url: '/user/passport/register', data: info, method: 'post' });
}

//获取注册验证码的
// /api/user/passport/sendCode/{phone}
// get
export const rqRegCode = (phone) => {
    return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
}

//登入账号的接口
// /user/passport/login  方式post
// 参数：phone:string,password:string
export const rqLoginAccount = (info) => {
    return requests({ url: '/user/passport/login', data: info, method: 'post' });
}


// 获取用户信息 带上token token在请求头里带
export const reqUserInfo = () => {
    return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
}

// 退出登录
export const reqLogout = () => {
    return requests({ url: '/user/passport/logout', method: 'get' });
}

// 获取用户的地址信息
// url :/user/userAddress/auth/findUserAddressList  methods:'get'
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList ', methods: 'get' });


//获取商品清单数据
export const reqShopInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

//获取支付信息接口
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//查询支付结果
export const reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取我的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });