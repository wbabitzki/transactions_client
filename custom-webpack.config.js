const webpack = require('webpack')
module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve("stream-browserify")
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        accessKeyId: JSON.stringify(process.env.AccessKeyId),
        secretAccessKey: JSON.stringify(process.env.SecretAccessKey),
        region: JSON.stringify(process.env.Region),
      },
    }),
  ],
};