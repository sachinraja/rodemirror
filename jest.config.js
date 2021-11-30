export default {
  transformIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.(j|t)sx?$': ['@swc/jest'],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
}
