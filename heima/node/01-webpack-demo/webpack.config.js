const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


const config = {
  // 打包模式（development 开发模式-使用相关内置优化）
  // mode: 'development',

  // 入口
  // entry: path.resolve(__dirname, 'src/login/index.js'),

  entry: {
    'login': path.resolve(__dirname, 'src/login/index.js'),
    'content': path.resolve(__dirname, 'src/content/index.js'),
    'publish': path.resolve(__dirname, 'src/publish/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/index.js',
    clean: true, // 生成打包后内容之前，清空输出目录
  },
  plugins: [ // 插件（给 Webpack 提供更多功能）
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/login.html'), // 模板文件
			filename: path.resolve(__dirname, 'dist/login/index.html'), // 输出文件
      useCdn: process.env.NODE_ENV === 'production', // 生产模式下使用 cdn 引入的地址
      chunks: ['login'] // 引入哪些打包后的模块（和 entry 的 key 一致）
		}),
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/content.html'),
			filename: path.resolve(__dirname, 'dist/content/index.html'),
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['content']
		}),
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/publish.html'),
			filename: path.resolve(__dirname, 'dist/publish/index.html'),
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['publish']
		}),
    new MiniCssExtractPlugin({
      filename: './[name]/index.css'
    }), // 生成css文件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  module: { // 加载器（让 webpack 识别更多模块文件内容）
    rules: [
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset',
				generator: {filename: 'assets/[hash][ext][query]'}
			},
    ],
  },
  optimization: { // 优化
    minimizer: [ // 最小化
      `...`, // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释（保证 js 代码还能压缩）
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all', // 所有模块动态非动态移入的都分割分析
      cacheGroups: { // 分隔组
        commons: { // 抽取公共模块
          minSize: 0, // 抽取的chunk最小大小字节
          minChunks: 2, // 最小引用数
          reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          name(module, chunks, cacheGroupKey) { // 分离出模块文件名
            const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
            return `./js/${allChunksNames}` // 输出到 dist 目录下位置
          }
        }
      }
    }
  },
  resolve: { // 解析
    alias: { // 别名
      '@': path.resolve(__dirname, 'src')
    }
  },
 
}

if (process.env.NODE_ENV === 'development') {
  // 开发模式下使用 source-map 方便调试
  config.devtool = 'inline-source-map'
  // config.stats = {
  //   children: true,    // 显示子编译信息
  //   errorDetails: true // 显示详细错误信息
  // }
}

if (process.env.NODE_ENV === 'production') {
  // 外部cdn扩展（让 webpack 防止 import 的包被打包进来）
  config.externals = {
    // key：import from 语句后面的模块字符串
    // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
    'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
    'axios': 'axios',
    'form-serialize': 'serialize',
    '@wangeditor/editor': 'wangEditor'
  }
}

module.exports = config
