const { defineConfig } = require('@vue/cli-service')
// const { name } = require('./package')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '7002',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: 'micvue2-[name]',
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: 'webpackJsonp_micvue2'
    }
  }
})
