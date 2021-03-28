/* eslint-disable no-unused-vars */
import babel from '@rollup/plugin-babel';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const banner =
    [
        `/*!`,
        `*`,
        `* AnimJS (${pkg.name})`,
        `*`,
        `* @version  : ${pkg.version}`,
        `* @author   : Enea Entertainment`,
        `* @homepage : http://www.enea.sk/`,
        `* @license  : MIT`,
        `*`,
        `*/`
    ].join('\n');

/* eslint-disable camelcase */
const terserOptions =
    {
        ecma     : 5,
        warnings : false,
        parse    : {},
        compress :
            {
                drop_console: true
            },
        mangle          : true,
        module          : false,
        toplevel        : false,
        nameCache       : null,
        ie8             : false,
        keep_classnames : undefined,
        keep_fnames     : false,
        safari10        : false
    };

const freeze = true;
const sourcemap = true;

export default
{
    input: 'src/index.js',

    treeshake: false,

    external:
        [
            ...Object.keys(pkg.peerDependencies || {})
        ],

    output:
        [
            {
                banner,
                file    : '_dist/anim.js',
                format  : 'umd',
                name    : 'anim',
                freeze,
                sourcemap,
                globals : {}
            }
        ],

    plugins:
        [
            resolve({
                jsnext  : true,
                main    : true,
                browser : true
            }),

            replace({
                exclude           : 'node_modules/**',
                preventAssignment : true,

                values:
                    {
                        __VERSION__: `${pkg.version}`
                    }
            }),

            babel({
                presets      : ['@babel/preset-env'],
                babelHelpers : 'bundled'
            }),

            terser(terserOptions)
        ]
};
