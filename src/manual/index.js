const path = require('path');
const extractZip = require('extract-zip');
const chalkRed = require('chalk').red;
const applyStyleCssPatch = require('../utils').applyStyleCssPatch;

const isZip = (file) => {
    return path.extname(file) === '.zip';
};

const extractInto = (source, dest) => {
    if (!isZip(source)) {
        throw chalkRed(`Cannot unzip ${source} since is not a .zip file`);
    }

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