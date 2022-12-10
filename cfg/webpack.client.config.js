const path = require ('path')
const {HotModuleReplacementPlugin, DefinePlugin} = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development'
IS_DEV ? console.log(`Сборка осуществляется в режиме разработки`) : console.log(`Сборка осуществляется в режиме релиза`)
const GLOBAL_CSS_REGEXP = /\.global.css$/
const DEV_PLUGINGS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]
const COMMON_PLUGINGS = [new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`})]

module.exports = {
	mode: process.env.NODE_ENV,
	entry: [
		path.resolve(__dirname, '../src/client/index.jsx'),
		'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr'
	],
	output: {
		path: path.resolve(__dirname, '../app/client'),
        filename: 'client.js',
		publicPath: '/static/'
	},				
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom'}
	},
	devtool: IS_DEV ? 'eval' : false,
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: ['ts-loader']
			},
			{
				test: /\.css$/,
				use: [
				  'style-loader',
				  {
					loader: 'css-loader',
					options: {modules: {mode: 'local',localIdentName: '[name]__[local]--[hash:base64:5]'}}
				  }
				],
				exclude: GLOBAL_CSS_REGEXP
			},
			{
				test: GLOBAL_CSS_REGEXP,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	plugins: IS_DEV ? DEV_PLUGINGS.concat(COMMON_PLUGINGS) : COMMON_PLUGINGS 
}