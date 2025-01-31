import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!lucide-react)"
  ],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/config/envs.config.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/tests/**/*.test.tsx"],
};

export default config;
