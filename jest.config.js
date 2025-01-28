module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!react-query)/"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1"
  }
};
