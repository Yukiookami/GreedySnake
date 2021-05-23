// 引入包
const path = require('path')

// 引入自动生成html的插件包
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 自动清空dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack的所有的配置信息都应该写在module.exports
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在目录
  output: {
    // 指定打包的路径
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: "bundle.js",

    // 告诉webpack不使用箭头函数(在需要兼容ie11以下的浏览器的时候可以用，一般没必要wb自己也懒得兼容了)
    // environment: {
    //   arrowFunction: false
    // }
  },

  // 指定webpack打包时使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: ['file-loader']
      },
      {     
        // test是规定生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 可以直接这样写就行，但是里面包含的配置项比较复杂所以还是最好配置一下
          // 'babel-loader',
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 兼容的目标浏览器
                    targets: {
                      "chrome": "87",
                    },
                    // 指定corejs版本（看package中的大版本）
                    "corejs": "3",
                    // 使用corejs的方式 （"usage"表示按需加载，会让文件大小最小）
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        // 处理器从下往上执行
        use: [
          "style-loader",
          "css-loader",
          // // 引入postcss
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         "postcss-preset-env",
          //         {
          //           browers: "last 2 versions"
          //         }
          //       ]
          //     }
          //   }
          // },
          "less-loader"
        ]
      }
    ]
  },
  
  // 配置webpack的插件
  plugins: [
    // 自动生成html
    new HTMLWebpackPlugin(
      {
        // 自定义选项
        // title: 'webTitle'
        // 也可以直接指定模版
        template: './src/index.html'
      }
    ),
    // 自动清空dist
    new CleanWebpackPlugin()
  ],

  // 告诉webpack哪些文件可以作为模块使用
  resolve: {
    extensions: ['.ts', '.js']
  }
}