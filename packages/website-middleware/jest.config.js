import { createJestConfig } from '../../configs/build-tools/jest-base.config.js';

export default createJestConfig({
  testEnvironment: "node",
  displayName: "Website Middleware",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.ts",
    "<rootDir>/src/**/tests/**/*.test.ts",
    "<rootDir>/src/**/*.test.ts"
  ],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/*.test.ts"
  ],
  moduleNameMapper: {
    "^@infinityvault/shared-infrastructure$": "<rootDir>/../shared-infrastructure/src/index.ts"
  }
});