import path from 'path'
import typescript from '@rollup/plugin-typescript'
import swc from 'rollup-plugin-swc'

const distDir = 'dist'

export default {
  input: path.join('src', 'index.tsx'),
  external: (id) => !/^(\.?\/|\w:)/.test(id),
  output: [
    { file: path.join(distDir, 'index.cjs'), format: 'cjs' },
    { file: path.join(distDir, 'index.js'), format: 'esm' },
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
      },
    }),
  ],
}
