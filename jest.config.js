const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  coverageReporters: ['html', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
