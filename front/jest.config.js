module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@img(.*)$': '<rootDir>/src/images$1',
      '^@css(.*)$': '<rootDir>/src/sass$1',
      '^@js(.*)$': '<rootDir>/src/js$1',
      '^@fonts(.*)$': '<rootDir>/src/fonts$1',
      '\\.(s?css)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: [
      './src/js/utils/tests/setupTests.js'
    ]
}