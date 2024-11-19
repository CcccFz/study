const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


const config = {
  // 打包模式（development 开发模式-使用相关内置优化）
  // mode: 'development',

  // 入口
  // entry: path.resolve(__dirname, 'src/login/index.js'),

  entry: path.resolve(__dirname, 'src/login/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
    clean: true,
  },

  // 解析
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/login.html'),   // 模板文件
			filename: path.resolve(__dirname, 'dist/login/index.html'),    // 输出文件
		}),
    new MiniCssExtractPlugin({
      filename: './login/index.css'
    }), // 生成 css 文件
  ],

  // 加载器（让 webpack 识别更多模块文件内容）
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ['style-loader', "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset',
				generator: {filename: 'assets/[hash][ext][query]'}
			},
    ],
  },

  // 优化
  optimization: {
    // 最小化
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释（保证 js 代码还能压缩）
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
}

module.exports = config