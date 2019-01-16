let path = require('path');

module.export = {
    entry: './src/index.ts',
    output: {
        filename: 'build.js',
        path: path.resolve('./dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {},
    plugins: [],
    mode: 'development',
    resolve: {}
}