const nodeExternals = require('webpack-node-externals');
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
};
module.exports = config;
