const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const knex = require('knex');
const knexfile = require('./knexfile');

const isLocal = process.env.NODE_ENV === 'development';
const isWatching = process.argv[2] === '--watch';
const knexEnv = process.env.NODE_ENV;

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

// Webpack configuration
const webpackConfig = [{

    mode: isLocal ? 'development' : 'production',
    devtool: isLocal ? 'eval-source-map' : false,
    target: 'node',
    externals: [
        nodeExternals()
    ],

    entry: {
        server: `${PATHS.src}/main.ts`
    },

    output: {
        filename: '[name].bundle.js',
        path: PATHS.dist,
    },

    resolve: {
        extensions: ['.ts']
    },

    watch: isWatching,

    watchOptions: {
        ignored: ['node_modules/**', 'app/**', 'dist/**']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: [PATHS.src]
            }
        ]
    }

}];

console.log("[MOB] Webpack start building app...");
console.log("[MOB] Configuration is : %s", (isLocal ? 'development' : 'production'));

// Webpack building
webpack(webpackConfig, (err, stats) => { 
    if (err) throw err;

    console.log('[MOB] Webpack app stats below :');
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: false,
        chunkModules: false
    }));

    if (stats.hasErrors()) {
        console.log('[MOB] App build failed with errors.\n');
        process.exit(1);
    }

    console.log('[MOB] Build app complete.\n');

    // Run latest migrations
    if (!isWatching) {
        const configOptions = knexfile[knexEnv];
        knex(configOptions).migrate.latest()
            .then(() => {
                console.log('[MOB] Migrations complete.\n');
                process.exit();
            })
            .catch((err) => {
                console.log(`[MOB] Error: ${err}`);
                process.exit(1);
            });
    }
});

