# TypeNav
## 一级列表动态添加背景颜色
1. 使用样式
2. 用js
    1. 首先确定鼠标移入了那个一级分类元素,可以用遍历时产生的序号
    2. 要有初始状态，可以用一个数据标记，当移入时就把默认值替换为序号，离开变回默认值。
    **注意mouseout,mouseleave事件的区别**在离开元素时可以将事件绑定到其父元素上利用事件的委派触发。
    3. 动态添加样式，用的是:class样式绑定，当当前元素的序号等于标记数据中的数据时就添加一个样式。


## 函数的防抖和节流
 防抖：前面的所有的触发都会被取消，只有最后一次执行在规定时间后才会触发，也就是快速触发多次，只会执行一次。
 lodash插件：封装了处理防抖和节流的方法
 节流：在规定时间间隔内不会重复触发回调，只有大于规定间隔才会再次触发回调。
 例如：鼠标移入事件 在多个单位快速移动，搜索输入框输入完再请求。
## typeNav一级标题节流
1. import throttle from 'lodash/throttle' 导入 节流函数throttle 

## typeNav点击一二三标题时，要从Home模块跳转到Search模块
1. 要确定点的是哪一级标题的哪一个，并且传递相应的数据，（产品的名字，和id）,
2. 跳转使用编程导航，声明式导航会产生太多vc实例
3. 绑定点击事件，不用每一个都绑定，可以事件委派到其就近的 父元素上。但会有一个问题，无法确定到底是那个元素触发的点击事件，不确定是否为标签
4. 使用H5的data-name，添加自定义属性，区分，是否点击了a,获取自定义属性，用节点的属性element.dataset，他是一个对象。
5. 然后用自定义属性去判断，并全响应的数据.
### typeNav切换后的隐藏
1. 用v-show ,
2. typeNav在多处使用需要，使用路由路径来判断控制哪一个。

# Home中的轮播图
## 使用Swiper插件
1. 需要引入样式，在入口引入（因为在其他组件中也需要使用）
2. 写好固定结构,并且初始化swiper
```js
<div class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
<script>
    var mySwiper = new Swiper ('.swiper', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        
</script>
```
3. 在Vue中因为轮播图的数据是异步获取，在初始化swiper时页面要有的DOM结构还没有渲染。需要有完整的结构再初始化。
4. 使用监听banners数据的变化，并且使用$nextTick(()=>{})(在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，
获取更新后的DOM。),在该函数中初始化swiper 
5. swiper6中的，部分组件效果如分页器需要单独导入，并且使用Swiper.use([Navigation])
### 离谱之大坑
Swiper6
出现坑的最大原因是：
1. 在第六版导入只能导入swiper核心内容，而部分组件效果如分页器需要单独导入
2. css引用已经与5 的版本不同，css的样式已经不在dist中了

# 将轮播图抽离为公共组件
1. 数据通过props从使用轮播图的父组件传递

# Search
## 跳转到Search时query参数和params合并
1. 当从导航点击了一个分类跳转后，带了query参数，然后需要在此分类下搜索，继续跳转要携带另一个参数（params）,或者先搜索，后点击了分类。
2. 需要将两个参数都带上再跳转。
3. 首先，修改搜索按钮中的路由跳转逻辑，加上判断，判断是$route.query对象中否存在query参数,有则加上
4. 如果先点导航再搜索就在goSearch（）方法中同样判断params参数存在，然后添加上。
5. 监听路径变化（$route）,路径变化说明数据变化，需要重新发起请求，以实现多次搜索,

## 面包屑导航
1. 每次点击搜索的关键字，和分类的名字都需要显示到导航上，并且可以删除。
2. 使用if语句判断reqdata中的keyword,categoryName,存在就显示
3. 删除绑定点击事件，并且删除标签的同时相应的展示内容也需要变化，（地址栏要变化，同时reqdata中数据变化，展示内容变化）
4. 可以点击事件函数回调中，重新跳转到Search路由带上变化后的数据，因为监听了路由地址变化可以发起请求，展示新的内容。
### SearchSelector  组件中的数据点击后也要添加到面包屑导航中。
1. 首先确定点击的是哪一个品牌,点击事件中需要传递参数
2. 将参数整理后发送到父组件，使用自定义事件，
3. 父组件将重新发起请求，请求数据中会添加trademark数据，接口文件中有关于其请求的数据格式。
4. 收到请求后需要添加标签，同时也要有移除标签功能，
5. 展示标签注意数据格式，利用spilt分割字符串得到想要的数据。
### 分类属性也要添加
1. 类似写法，区别是这个数据的格式是一个数组，添加标签时需要遍历数组，
2. 同时需要判断添加到便签数组中的数据需要去重，防止重复点击出现相同的标签

**注意一点，在添加面包屑导航时，点击品牌和它下面的属性，添加上去的导航，让地址有变化所以，监听不到变化无法发起请求和整理参数，所以在删除这两个地方的导航时需要重新整理数据发起请求。**


# 分页器
## 拆成组件
## 解决连续分页展示
## 展示第一页和最后一页问题
## 点击传递id请求数据

# axios.get() axios.post() axios({url:'',data:,methods:'get'}) 带参数的方式
```js
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
```

# Detail组件
## 商品信息展示
1. 获取数据依次展示，
### 商品属性的选择
1. 排他思想
## Zoom组件
1. 图片放大镜
### ImgLIst组件（轮播图）

# AddCartSuccesss 组件
1. 点击跳转时需要发起请求添加到服务器中
2. 请求成功的结果需要从该仓库的Actions中传递给派发它的组件，用dispatch()返回值,是一个promise对象。
3. 如何获取promise对象中获取需要的结果。暂时使用async/await,（then()不知道如何获取）
4. 获取了加入成功的信息后就跳转到AddCartSuccesss路由，携带商品数目。
5. 需要携带的其他商品属性，通过会话存储到本地， sessionStorage.setItem('key',value)
6. 存入的value要是字符串，如果是对象，使用Josn.stringfy()转化。获取用Josn.prase()转换为对象。

# ShopCart 组件
## 购物车中也可以改变数量，需要发送添加购物车请求。
1. 区分商品数量的加减，传递改变的差值。
2. 点击需要限流操作。

## 是否全选判断。需要判断每个个体中的isChecked属性
1. every()和some() 判断一个数组对象中的所有数据或某个值都满足条件
every() 只要有一个不符合条件就为 false (一假即假)
some() 只要有一个符合条件就位 true (一真即真)
### 商品选中全部选中，和全选按钮之间的状态同步。
## 删除购物车中的商品，
### 将id传递，通过删除的接口删除，
### 删除选中的,
1. 需要在action中再派发dispatch,因为需要每一个商品的数据信息。

# 登入和注册组件