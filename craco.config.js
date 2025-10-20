const path = require('path')
const resolve = dir =>  path.resolve(__dirname, dir)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "@utils": resolve("src/utils"),
    },
    plugins:[
      new BundleAnalyzerPlugin({analyzerPort: 9000}),
    ], 
    configure: (webpackConfig) => {
      webpackConfig.devtool = false;
      return webpackConfig;
    }
  }
}