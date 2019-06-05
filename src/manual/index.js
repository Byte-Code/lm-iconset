const extractZip = require('extract-zip');
const applyStyleCssPatch = require('../utils').applyStyleCssPatch;

const extractInto = (source, dest) => {
    console.log(`Unzipping ${source} into ${dest}`);
    extractZip(source, { dir: dest }, (err) => {
        if (err) {
            throw err;
        } else {
            applyStyleCssPatch();
        }
    });
};

module.exports = (zipFile, dist) => {
    extractInto(zipFile, dist);
};