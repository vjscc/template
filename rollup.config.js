import path from 'path'
import pkg from './package.json'

import clear from 'rollup-plugin-clear'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import less from 'rollup-plugin-less'
import ts from 'rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import LessPluginCleanCSS from 'less-plugin-clean-css'

const isProduction = process.env.NODE_ENV === 'production'
const input = path.join(__dirname, 'src/index.ts')

function getPlugins(lessConfig = {}, declaration) {
  return [
    clear({
      targets: ['dist']
    }),
    resolve(),
    commonjs(),
    less({ output: false, ...lessConfig }),
    ts({
      transpiler: 'swc',
      tsconfig: {
        declaration
      }
    })
  ]
}

/**
 * @typedef RollupOptions
 * @type {import('rollup').RollupOptions}
 */

/**
 * @returns {RollupOptions}
 */
function createDevConfig() {
  return {
    input,
    output: {
      name: pkg.global,
      file: pkg.main,
      format: 'umd',
      exports: 'auto',
      sourcemap: true
    },
    plugins: getPlugins({ insert: true }, true)
  }
}

/**
 * @returns {RollupOptions[]}
 */
function createProdConfig() {
  return [
    {
      input,
      output: {
        name: pkg.global,
        file: pkg.main,
        format: 'umd',
        exports: 'auto',
        sourcemap: true
      },
      plugins: getPlugins({ output: pkg.css }, true)
    },
    {
      input,
      output: {
        name: pkg.global,
        file: pkg.browser,
        format: 'umd',
        exports: 'auto',
        sourcemap: true,
        plugins: [terser()]
      },
      plugins: getPlugins({
        output: pkg.mincss,
        plugins: [new LessPluginCleanCSS({ advanced: true })]
      })
    },
    {
      input,
      output: {
        file: pkg.module,
        format: 'esm',
        exports: 'auto',
        sourcemap: true
      },
      plugins: getPlugins()
    }
  ]
}

const config = isProduction ? createProdConfig() : createDevConfig()

export default config
