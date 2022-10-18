const webpack = require('webpack')
module.exports = {
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