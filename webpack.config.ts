import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

let config: webpack.Configuration = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // https://webpack.js.org/guides/asset-modules/
            {
                test: /\.(vert|frag)$/,
                type: 'asset/source'
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            'buffer': require.resolve('buffer')
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/libs'),
        library: '[name]'
    },
    devServer: {
        devMiddleware: {
            publicPath:  path.resolve(__dirname, './public'),
            writeToDisk: true,
        },
        static: path.resolve(__dirname, './public'),
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        // historyApiFallback: true,
        // open: true,
    }
}

function buildConfig(env: 'development' | 'production') {
    config.mode = (env === 'development' || env === 'production') ? env : 'development';
    return config;
}

module.exports = buildConfig;
