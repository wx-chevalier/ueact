import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
export default {
  entry: 'src/index.js',
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false
    }),
    // 对于项目中的 ts 代码进行转化
    typescript(),
    // 使用 Babel 转化 JavaScript 代码
    babel({
      include: ['src/**', 'node_modules/observer-x/dist/observer-x.es.js']
    }),
    // 进行代码压缩
    uglify()
  ],
  format: 'umd',
  moduleName: 'Ueact'
};
