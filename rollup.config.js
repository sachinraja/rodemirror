import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import swc from 'rollup-plugin-swc'
import dts from 'rollup-plugin-dts'

const distDir = 'dist'

const input = path.join('src', 'index.tsx')
const external = (id) => !/^(\.?\/|\w:)/.test(id)

export default [
  {
    input,
    external,
    output: [
      { file: path.join(distDir, 'index.cjs'), format: 'cjs' },
      { file: path.join(distDir, 'index.js'), format: 'esm' },
    ],
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.tsx'],
      }),
      swc(),
    ],
  },
  {
    input,
    external,
    output: { file: path.join(distDir, 'index.d.ts'), format: 'esm' },

    plugins: [dts()],
  },
]
