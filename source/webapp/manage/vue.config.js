// 翻阅文档https://cli.vuejs.org/zh/config/#vue-config-js
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)

const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

// console.log(process.env.NODE_ENV)

module.exports = {
  //生产环境的source map，设置为 false 加速生产环境构建，如果需要用到source map再打开
  productionSourceMap: false,
  //部署应用包时的基本 URL
  publicPath: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') ? './' : '/vue-manage-system/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'vue-manage-system',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: 'index.html',

  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true,
              inline: false,
              pure_funcs: ['console.log']// 打包移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
    }
  },

  // Webpack内部配置
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))

    // 找到各种loader 方便自定义配置
    const imagesRule = config.module.rule('images')

    // 图片压缩 开发环境不压缩，影响开发时候编译速度
    if (!IS_DEV) {
      imagesRule
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        })
    }

    // 配置loader
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 10000000,
    //     // name: utils.assetsPath('img/[name].[hash:7].[ext]')
    //   })
  },

  css: {
    loaderOptions: {
      sass: {
        // 全局注入通用样式
      },
      postcss: {
        plugins: [
          // pxtorem({
          //   // 配置px转换rem插件（目的是为了转换UI库单位，UI库默认是px）https://github.com/cuth/postcss-pxtorem
          //   rootValue: 100,
          //   propList: ['*'],
          //   selectorBlackList: [/^(?![\.|#]van-).*$/], // 忽略不是'.van-','#van-'开头的选择器，目的是只转换vant ui库里的，页面里的不需要
          //   minPixelValue: 2, // 最小像素值（小于这个像素不会被转换）
          // }),
          autoprefixer({
          })
        ]
      }
    }
  },

//   devServer: { // 设置代理
//     hot: true, //热加载
//     host: '0.0.0.0', //ip地址
//     port: 9698, //端口
//     disableHostCheck: true, //内网穿透映射到外网需要添加这一行，不然会报Invalid Host header错误
//     https: false, //false关闭https，true为开启
//     open: false, //自动打开浏览器
//     proxy: {
//       '/': { //本地                                        
//         // target: 'https://sports.api.ibumobile.com', // 测试
//         // target: 'http://172.16.4.145', // 开发
//         // target: 'http://172.16.6.166:8880', // 黄书化
//         // target: 'http://172.16.6.168:8880', // 汤文武
//         // target: 'http://172.16.8.129:8880', // 何壹轩
//         //  target: 'http://172.16.6.192:8880',
//         //target: 'http://172.16.6.168:8880',
//         // target:"http://172.16.6.192:8880", // 周勇
//         // 如果要代理 websockets
//         ws: false,
//         changeOrigin: true,
//       }
//     }
//   }
}