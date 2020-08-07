module.exports = {
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@components': require.resolve(__dirname, './src/components')
  //     }
  //   }
  // }
  css: {
    loaderOptions: {
      css: {
        //todo:css module
        //是否使用分离插件
        // extract: true,
        // sourceMap: false
        // requireModuleExtension: false, //去掉文件名中的.module
        // modules: {
        //   localIdentName: '[module]-[name]-[hash]'
        // }
        // localsConvention: 'camelCaseOnly'
      },
      //给sass-loader 传递选项
      //// `scss` 语法会要求语句结尾必须有分号
      scss: {
        additionalData: `@import "~@/constants/variables.scss";`
      }
    }
  }
}
