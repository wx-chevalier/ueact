import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  format: 'umd',
  moduleName: 'observerX'
};
