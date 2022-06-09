const path = require('path');

module.exports = {
	entry: './app/Main.js',
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'app'),
		filename: 'bundled.js'
	},
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		port: 3000,
		static: {
			directory: path.join(__dirname, 'app')
		},
		hot: true,
		historyApiFallback: { index: 'index.html' },
		liveReload: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', ['@babel/preset-env', { targets: { node: '12' } }]]
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash]-[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	}
};
