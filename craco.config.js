const path = require('path')
const resolve = dir =>  path.resolve(__dirname, dir)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "@utils": resolve("src/utils"),
    },
    plugins:[
      new BundleAnalyzerPlugin({analyzerPort: 9000}),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /.(js|css|html)$/, // 需要压缩的文件类型
        threshold: 10240, // 只有大于 10KB 的文件才进行压缩
        minRatio: 0.8, // 只有压缩比低于 0.8 才会被压缩
        deleteOriginalAssets: false, // 是否删除原始文件，通常保留原始文件，方便回退
      })
    ],
    mode: 'production',
    configure: (webpackConfig) => {
      webpackConfig.devtool = false;
      return webpackConfig;
    }
  }
}