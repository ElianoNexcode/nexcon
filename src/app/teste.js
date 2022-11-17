const fs = require('fs');
module.exports = (config, options) => {
    config.plugins.push({
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('MyAfterEmitPlugin', (compilation) => {
                // Replace 'app' path below with your subfolder path
                fs.renameSync('./dist/controls/index.html', './dist/index.html');
                fs.renameSync('./dist/controls/favicon.ico', './dist/favicon.ico');
            });
        }
    });
    return config;
};