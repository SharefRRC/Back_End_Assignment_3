module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"]
};