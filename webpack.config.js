// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlMinimizerWebpackPlugin = require('html-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const webpack = require('webpack');

const config = {
  entry: {
    index: "./src/js/index.js",
      api: "./src/js/tsl_api.js",
    },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: './js/[name].js',
    assetModuleFilename: "../img2/[name][ext]"/*,
    publicPath: '../../'*/
  },
  plugins: [
      new MiniCssExtractPlugin(
          {
            linkType: "text/css",
            filename: isProduction ? './style/[name].css': './style/[name].[contenthash].css',
          }
      ),
      new HtmlWebpackPlugin(
          {
            template: './src/html/index.html',
            filename: 'index.html',
            inject: true,
            hash: !isProduction
          }
      ),
    new HtmlWebpackPlugin(
        {
          template: './src/html/cargo.html',
          filename: 'cargo.html',
          inject: true,
          hash: !isProduction
        }
    ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/transport.html',
              filename: 'transport.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/service.html',
              filename: 'service.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/spare.html',
              filename: 'spare.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/roadside.html',
              filename: 'roadside.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/gas.html',
              filename: 'gas.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/avto.html',
              filename: 'avto.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-registration.html',
              filename: 'lk-registration.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-enter.html',
              filename: 'lk-enter.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-resetpassword.html',
              filename: 'lk-resetpassword.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-cargo.html',
              filename: 'adding-cargo.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-service.html',
              filename: 'adding-service.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-spare.html',
              filename: 'adding-spare.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-avto.html',
              filename: 'adding-avto.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-avto-sale.html',
              filename: 'adding-avto-sale.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/adding-roadside.html',
              filename: 'adding-roadside.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/info-personal-data.html',
              filename: 'info-personal-data.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/info-privacy-policy.html',
              filename: 'info-privacy-policy.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/info-contacts.html',
              filename: 'info-contacts.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/info-support-service.html',
              filename: 'info-support-service.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/info-about-us.html',
              filename: 'info-about-us.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/info-conditions.html',
              filename: 'info-conditions.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/info-rulers.html',
              filename: 'info-rulers.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/rp.html',
              filename: 'rp.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-chat.html',
              filename: 'lk-chat.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-chat-massage.html',
              filename: 'lk-chat-massage.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-data.html',
              filename: 'lk-data.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-company.html',
              filename: 'lk-company.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-staff.html',
              filename: 'lk-staff.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-staff-add.html',
              filename: 'lk-staff-add.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-staff-edit.html',
              filename: 'lk-staff-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-my-ads.html',
              filename: 'lk-my-ads.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-my-shop.html',
              filename: 'lk-my-shop.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-favorites.html',
              filename: 'lk-favorites.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/route-cargo.html',
              filename: 'route-cargo.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/route.html',
              filename: 'route.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/counterparty.html',
              filename: 'counterparty.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/servise-map.html',
              filename: 'servise-map.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/roadside-map.html',
              filename: 'roadside-map.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/route-cargo.html',
              filename: 'route-cargo.html',
              inject: true,
              hash: !isProduction
          }
      ),
      new HtmlWebpackPlugin(
          {
              template: './src/html/route-truck.html',
              filename: 'route-truck.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-cargo-edit.html',
              filename: 'lk-cargo-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-truck-edit.html',
              filename: 'lk-truck-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-service-edit.html',
              filename: 'lk-service-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-spare-edit.html',
              filename: 'lk-spare-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-avtosale-edit.html',
              filename: 'lk-avtosale-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),

      new HtmlWebpackPlugin(
          {
              template: './src/html/lk-roadside-edit.html',
              filename: 'lk-roadside-edit.html',
              inject: true,
              hash: !isProduction
          }
      ),


      new CleanWebpackPlugin ({}),

    new CopyWebpackPlugin ( {
        patterns: [
            {
                from: "./img/*.*",
                to: "./",
                context: "./src/"
               },
            {
                from: "./img/flags/*.*",
                to: "./",
                context: "./src/"
            },
            {
                from: "./imgdb/*.*",
                to: "./",
                context: "./src/"
            },
            {
                from: "./img/cargo/*.*",
                to: "./",
                context: "./src/"
            },
            {
                from: "./img/spare/*.*",
                to: "./",
                context: "./src/"
            },
            {
                from: "./fonts/*.*",
                to: "./",
                context: "./src/"
            },
            {
                from: "./data/*.*",
                to: "./",
                context: "./src/"
            }
        ],
        options: {
            concurrency: 100,
        },
      }),

      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
       new HtmlMinimizerWebpackPlugin()
    ]
  } ,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },

            {
                loader: 'css-loader',
                options:
                    {
                        url: false,
                        sourceMap: true,
                    }
            }
        ],
        /*exclude: /node_modules/*/
      },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
        },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    config.devServer = {
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true,
      watchContentBase: true,
      compress: true,
      hot: true,
      port: 8000
    };
  }
  return config;
};
