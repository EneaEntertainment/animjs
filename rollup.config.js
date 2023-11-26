import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import esbuild from 'rollup-plugin-esbuild';

const banner =
    [
        `/*!`,
        `*`,
        `* ${pkg.name}`,
        `*`,
        `* @version  : ${pkg.version}`,
        `* @author   : Enea Entertainment`,
        `* @homepage : https://www.enea.sk/`,
        `*`,
        `*/`
    ].join('\n');

export default [
    {
        input: '_dist-tsc/index.js',

        plugins: [
            esbuild(),

            copy({ targets: [{ src: ['README.md', 'LICENSE', 'global.d.ts'], dest: '_dist' }] }),

            generatePackageJson({
                baseContents: (pkg) => ({
                    name             : pkg.name,
                    version          : pkg.version,
                    description      : pkg.description,
                    author           : pkg.author,
                    homepage         : pkg.homepage,
                    license          : pkg.license,
                    main             : pkg.main,
                    type             : pkg.type,
                    types            : pkg.types,
                    repository       : pkg.repository,
                    bugs             : pkg.bugs,
                    keywords         : pkg.keywords,
                    scripts          : {},
                    dependencies     : pkg?.dependencies ?? {},
                    peerDependencies : pkg?.peerDependencies ?? {}
                })
            })
        ],

        treeshake: false,

        external:
            [
                ...Object.keys(pkg.peerDependencies || {})
            ],

        output:
            [
                {
                    banner,
                    file      : '_dist/index.js',
                    format    : 'es',
                    freeze    : true,
                    sourcemap : true
                }
            ]
    },

    {
        input   : './src/index.ts',
        output  : [{ file: '_dist/index.d.ts', format: 'es' }],
        plugins : [dts()]
    }
];
