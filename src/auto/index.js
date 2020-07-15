const fs = require('fs');
const path = require('path');
const chalkRed = require('chalk').red;
const execSync = require('child_process').execSync;
const applyStyleCssPatch = require('../utils').applyStyleCssPatch;

const isDirNonEmpty = (dir) => {
    return fs.readdirSync(dir).length > 0;
};

const discardChanges = (dir) => {
    execSync(`git checkout -- ${dir}`);
};

const isSvg = (file) => {
    return path.extname(file) === '.svg';
};

const getSvgs = (folder) => {
    const svgs = [];
    fs.readdirSync(folder).forEach((file) => {
        if (isSvg(file)) {
            svgs.push(path.resolve(folder,file));
        }
    });
    return svgs;
};

const execIcomoonCli = (icomoonOptions) => {
    const i = `-i ${icomoonOptions.icons.join(' ')}`;
    const s = `-s ${icomoonOptions.selectionPath}`;
    const o = `-o ${icomoonOptions.outputDir}`;
    const command = `yarn icomoon-cli ${s} ${i} ${o}`;
    console.log(`Executing: ${command}`);
    execSync(command, {stdio:'inherit'});
};

const createIcomoonOptions = (dist, icons, names = [], visible = false, forceOverride = false) => {
    return {
        selectionPath: path.resolve(dist, 'selection.json'),
        icons,
        names,
        outputDir: dist,
        forceOverride,
        visible,
    }
};

module.exports = (paths, dist) => {
    const files = paths.split(',');
    let icons = [];

    files.forEach((file) => {
        if (fs.statSync(file).isDirectory()) {
            icons = icons.concat(getSvgs(file));
        } else {
            if (isSvg(file)) {
                icons.push(path.resolve(file));
            }
        }
    });

    console.log('I found those icons:', icons);

    if (!icons.length) {
        throw chalkRed(`Cannot found any .svg into ${paths}`);
    }

    const icomoonOptions = createIcomoonOptions(dist, icons);
    execIcomoonCli(icomoonOptions);
    if (isDirNonEmpty(icomoonOptions.outputDir)) {
        applyStyleCssPatch();
    } else {
        discardChanges(icomoonOptions.outputDir);
        throw chalkRed('It appears that icomoon.io is not responding correctly\n' +
            'Please wait some minutes before retry or try the "manual procedure"');
    }
};
