let webpack = require('webpack');
let { resolve } = require('path');

module.exports = {
	context: resolve(__dirname, 'src'),
	entry: [
	'react-hot-loader/patch',
	'webpack-dev-server/client?http://localhost:8080',
	'webpack/hot/only-dev-server',
	'./index.jsx'
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, '/'),
		publicPath: '/',
	},
	devtool: 'inline-source-map',
 devServer: {
  hot: true,
  // enable HMR on the server

  contentBase: resolve(__dirname, 'dist'),
  // match the output path

  publicPath: '/'
  // match the output `publicPath`
},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: 'babel-loader',
			exclude: /node_modules/,
		},{
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
			exclude: /node_modules/,
		}
		]
	},
	plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	]
}