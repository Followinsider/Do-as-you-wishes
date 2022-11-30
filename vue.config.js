// vue.config.js
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const webpack = require('webpack');
// const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
  mainLessFile: "",
  themeVariables: ['@primary-color'],
  generateOnce: false,

}
const themePlugin = new AntDesignThemePlugin(options);

module.exports = defineConfig({
  // publicPath: "/Do-as-you-wishes/",
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
        less: {
          javascriptEnabled: true,
        }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, 
      // new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/)
      new webpack.IgnorePlugin({resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/},),
      new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(`./public/vendor/antd-manifest.json`)
      }),
      new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(`./public/vendor/echarts-manifest.json`)
      }),
      new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(`./public/vendor/lodash-manifest.json`)
      }),
      new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(`./public/vendor/vue-manifest.json`)
      }),
    ],
    resolve: {
      alias: {
        "@ant-design/icons/dist$": path.resolve(__dirname, "./src/icons.js"),
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ]
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg"); 
    
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5500",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }else if(process.env.MOCK !== "none") {
            // const name = req.path.split("/api/")[1].split('/').join('_');
            let result = null
            const name = req.path.split("/api/")[1];
            if (name) {
              const mock = require(`./mock/${name}`);
              result = mock(req.method);
            }

            // 清理缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  },

  
})