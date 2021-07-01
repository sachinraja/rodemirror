import ts from 'rollup-plugin-ts'

export default {
  input: 'src/index.tsx',
  external: (id) => !/^(\.?\/|\w:)/.test(id),
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { dir: './dist', format: 'es' },
  ],
  plugins: [
    ts({
      transpiler: 'babel',
    }),
  ],
}
