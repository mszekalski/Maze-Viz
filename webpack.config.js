var path = require('path');

module.exports = {
    entry: "./lib/maze.js",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};