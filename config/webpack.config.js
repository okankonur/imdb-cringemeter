'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
    merge(common, {
        entry: {
            contentScript: PATHS.src + '/contentScript.js',
            background: PATHS.src + '/background.js',
            cringemeter: PATHS.src + '/cringemeter.css'
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
    });

module.exports = config;
