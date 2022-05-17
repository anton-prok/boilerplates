const baseConfig = require('./base');
const { merge } = require('webpack-merge');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const web = results["Ethernet"] ? results["Ethernet"] : results["Беспроводная сеть"];

module.exports = merge(baseConfig, {
    mode: 'development',
    stats: 'errors-warnings',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        compress: true,
        host: 'local-ipv4',
        open: false,
        port: 3000,
        client: {
            progress: true,
            logging: 'none',
        },
    },
    devtool: 'inline-source-map',
    plugins: [
        new ESLintPlugin(),
        new CleanTerminalPlugin({
            message: `Dev server running on http://${web[0]}:3000`,
            beforeCompile: false,
        }),
    ],
});
