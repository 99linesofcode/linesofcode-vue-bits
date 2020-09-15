module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/js/$1',
        '^Classes/(.*)$': '<rootDir>/resources/js/classes/$1',
        '^Components/(.*)$': '<rootDir>/resources/js/components/$1',
        '^Pages/(.*)$': '<rootDir>/resources/js/pages/$1',
        '^Store/(.*)$': '<rootDir>/resources/js/store/$1'
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    snapshotSerializers: ['jest-serializer-vue'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest'
    }
};
