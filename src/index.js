const autoFlow = require('./auto/index');
const manualFlow = require('./manual/index');
const utils = require('./utils');
const program = require('commander');

program
    .arguments('<paths>')
    .option('-m, --manual', 'Update the iconset providing the zip file downloaded from icomoon.io')
    .action((paths) => {
        if (program.manual) {
            manualFlow(paths, utils.getDistDir());
        } else {
            autoFlow(paths, utils.getDistDir())
        }
    })
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
    process.exit(1);
}





