module.exports = {
  testEnvironment: "jest-environment-jsdom",

    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    setupFiles: ['<rootDir>/jest.polyfills.cjs'],
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
  };