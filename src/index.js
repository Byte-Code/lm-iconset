const fs = require('fs');
const path = require('path');
const chalkRed = require('chalk').red;
const execSync = require('child_process').execSync;
const appRootDir = require('app-root-dir');
const manualFlow = require('./manual/index');
const utils = require('./utils');
const program = require('commander');

const isDirNonEmpty = (dir) => {
    return fs.readdirSync(dir).length > 0;
};

const applyStyleCssPatch = () => {
    execSync('git apply style.css.patch');
};

const discardChanges = (dir) => {
    execSync(`git checkout -- ${dir}`);
};

const execIcomoonCli = (icomoonOptions) => {
    const i = `-i ${icomoonOptions.icons.join(' ')}`;
    const s = `-s ${icomoonOptions.selectionPath}`;
    const o = `-o ${icomoonOptions.outputDir}`;
    const command = `yarn icomoon-cli ${s} ${i} ${o}`;
    console.log(`Executing: ${command}`);
    execSync(command, {stdio:'inherit'});
};

const isSvg = (file) => {
    return path.extname(file) === '.svg';
};

const isZip = (file) => {
    return path.extname(file) === '.zip';
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

const createIcomoonOptions = (icons, names = [], visible = false, forceOverride = false) => {
    const distDir = 'dist';

    return {
        selectionPath: path.resolve(appRootDir.get(), `${distDir}/selection.json`),
        icons,
        names,
        outputDir: path.resolve(appRootDir.get(), distDir),
        forceOverride,
        visible,
    }
};

program
    .arguments('<paths>')
    .option('-m, --manual', 'Update the iconset providing the zip file downloaded from icomoon.io')
    .action((paths) => {
        const isManual = program.manual;

        console.log(`paths: ${paths}, --manual: ${isManual}`);
        return;

        if (isManual) {
            manualFlow(paths, utils.getDistDir());
        }


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
        if (!icons.length) {
            const error = chalkRed(`Cannot found any .svg into ${paths}`);
            throw new Error(error);
        }

        const icomoonOptions = createIcomoonOptions(icons);
        console.log(icomoonOptions);
        execIcomoonCli(icomoonOptions);
        if (isDirNonEmpty(icomoonOptions.outputDir)) {
            applyStyleCssPatch();
        } else {
            const error = chalkRed('It appears that icomoon.io is not responding correctly\n' +
            'Please wait some minutes before retry or try the "manual procedure"');
            discardChanges(icomoonOptions.outputDir);
            throw new Error(error);
        }

    })
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
    process.exit(1);
}





