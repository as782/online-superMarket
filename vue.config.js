const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //配置代理服务器解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
        pathReWrite: {
          '^/api': ''   //请求的时候使用这个api就可以
        }
      }
    }
  },

})
