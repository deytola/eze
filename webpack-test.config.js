const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  entry: [path.join(CURRENT_WORKING_DIR, './all-tests.js')],
  target: 'node',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    publicPath: '/dist/',
    filename: 'testBundle.js',
  },
  externals: [nodeExternals()],
  node: {
    fs: 'empty',
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: 'mocha --reporter spec ./dist/testBundle.js',
    }),
  ],
};
module.exports = config;
