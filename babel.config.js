module.exports = {
  plugins: ['@babel/syntax-dynamic-import', '@babel/transform-runtime'],
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@babel/preset-env',
  ],
  env: {
    cjs: {
      plugins: ['@babel/transform-runtime', 'transform-dynamic-import'],
      presets: [['@babel/env']],
    },
    esm: {
      plugins: ['@babel/transform-runtime'],
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
    },
    test: {
      presets: [['@babel/env', { targets: { node: true } }]],
      // There is no @babel/ scoped transform for this plugin
      plugins: ['transform-dynamic-import'],
    },
  },
}
