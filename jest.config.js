module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'text-summary', 'html', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/__tests__/**',
    '!**/index.ts',
    '!src/config/*',
    '!prisma/*',
  ],
  roots: ['./src'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  reporters: ['default', 'jest-junit'],
};
