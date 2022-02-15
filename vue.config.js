module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '七天网络助手'
        return args
      })
  },
  transpileDependencies: ["vuetify"],
  publicPath: "./",
};
