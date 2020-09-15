module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                modules: 'commonjs',
                targets: {
                    node: 'current'
                }
            }
        ]
    ];

    return {
        presets
    };
};
