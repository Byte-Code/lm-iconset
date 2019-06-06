const execSync = require('child_process').execSync;
const appRootDir = require('app-root-dir');
const path = require('path');

const DIST_FOLDER_NAME = 'dist';

const applyStyleCssPatch = () => {
    execSync('git apply style.css.patch');
};

const getDistDir = () => {
    return path.resolve(appRootDir.get(), DIST_FOLDER_NAME);
};

module.exports = {
    applyStyleCssPatch,
    getDistDir
};
