export default {
  transformIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.(j|t)sx?$': [
      '@swc/jest',
      {
        module: { type: 'commonjs' },
      },
    ],
  },
  moduleNameMapper: {
    rodemirror: '<rootDir>/src/index.tsx',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
}
