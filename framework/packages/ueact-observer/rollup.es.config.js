const flow = require('rollup-plugin-flow');

export default {
  entry: 'src/index.js',
  plugins: [flow()],
  format: 'es'
};
