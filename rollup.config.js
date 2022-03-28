import path from 'path'
import pkg from './package.json'

import clear from 'rollup-plugin-clear'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import less from 'rollup-plugin-less'
import ts from 'rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import LessPluginCleanCSS from 'less-plugin-clean-css'

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      name: pkg.global,
      file: pkg.main,
      format: 'umd',
      exports: 'auto'
    },
    {
      name: pkg.global,
      file: pkg.browser,
      format: 'umd',
      exports: 'auto',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'auto'
    }
  ],
  plugins: [
    clear({
      targets: ['dist']
    }),
    resolve(),
    commonjs(),
    less({
      insert: !isProduction,
      output: pkg.style,
      option: {
        plugins: isProduction
          ? [
              new LessPluginCleanCSS({
                advanced: true
              })
            ]
          : undefined
      }
    }),
    ts({
      transpiler: 'swc'
    })
  ]
}

export default config
