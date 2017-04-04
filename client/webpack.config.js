const isDebug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = {
    context: path.join(__dirname, 'src'),
    devtool: false,
    entry: ['babel-polyfill', 'react-hot-loader/patch', './js/client.jsx'],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /swagger\/*/,
                use: 'imports-loader?define=>false'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'Android 2.3',
                                            'Android >= 4',
                                            'Chrome >= 20',
                                            'Firefox >= 24',
                                            'Explorer >= 8',
                                            'iOS >= 6',
                                            'Opera >= 12',
                                            'Safari >= 6'
                                        ]
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=image/svg+xml' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' }
        ]
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'client.min.js'
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? JSON.stringify('development') : JSON.stringify('production'),
            __DEV__: isDebug
        })
    ]
};

if (isDebug) {
    config.plugins.push(new StyleLintPlugin());
    config.plugins.push(
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules[/\\].*/,
            // add errors to webpack instead of warnings
            failOnError: true
        })
    );
} else {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
            warnings: true
        }
    }));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

module.exports = config;
