module.exports = {
  testEnvironment: "<rootDir>/src/tests/jsdom-extended.js",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/jest.polyfills.cjs', '<rootDir>/setEnvVars.js'],
  moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  testEnvironmentOptions: {
      customExportConditions: [''],
    },
  };