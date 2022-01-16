const config = {
  collectCoverageFrom: [], // 是从 .tsx文件收集 而不是从 .test.tsx文件收集
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  // 设置具体指标的阈值，当运行覆盖率报告之后得到的结果没有达到阈值的时候，这时候就给我们报提示
  // coverageThreshold: {
  //   "global": {
  //     "branches": 90,
  //     "functions": 90,
  //     "lines": 90,
  //     "statements": 90
  //   }
  // }
};

module.exports = config;
