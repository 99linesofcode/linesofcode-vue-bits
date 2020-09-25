import { terser } from 'rollup-plugin-terser';
import path from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import vue from 'rollup-plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/vue-bits.mjs',
        format: 'es',
        exports: 'named'
    },
    external: ['vue'],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.ES_BUILD': JSON.stringify('true')
        }),
        alias({
            resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            entries: {
                '@': path.resolve(path.resolve(__dirname), 'src')
            }
        }),
        vue({
            style: {
                postcssPlugins: [
                    autoprefixer(),
                    tailwindcss()
                ]
            },
        }),
        babel(),
        commonjs(),
        terser()
    ]
};
