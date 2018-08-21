const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'client'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: 'build'
    },
    module: {
        rules: [
            {
                test: /jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, 
        ]
    }

}

