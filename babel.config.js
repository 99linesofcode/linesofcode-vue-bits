const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    presets: [
        [
            isProduction ? '@babel/preset-env' : '@vue/babel-preset-app',
        ]
    ]
};
