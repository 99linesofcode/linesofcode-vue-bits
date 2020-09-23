module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1/'
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    snapshotSerializers: ['jest-serializer-vue'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest'
    }
};
