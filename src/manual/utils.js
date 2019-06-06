// const fs = require('fs');
const extractZip = require('extract-zip');

const extractInto = (source, dest) => {
    extractZip(source, { dir: dest }, async (err) => {
        if (err) {
            throw err;
        }
        // await fs.remove(zipPath);
        // logger(`Finished. The output directory is ${outputDir}.`);
    });
};

module.exports = {
    extractInto
};
