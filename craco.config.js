/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@fluentui\/react-window-provider/,
          /node_modules\/@fluentui\/react/,
          /node_modules\/@fluentui\/react-components/
        ],
      });

      webpackConfig.ignoreWarnings = [
        {
          module: /@fluentui\/react-window-provider/,
          message: /Failed to parse source map/,
        },
      ];

      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      '/mirel/mapi': {
        target: 'http://localhost:8080/mipla2',
        pathRewrite: { 
          '^/mirel/mapi': '' 
        },
        changeOrigin: true,
      }
    }
  }
};
/* eslint-enable @typescript-eslint/no-var-requires */