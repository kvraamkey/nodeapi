#!/usr/bin/env node


/**
 * Copyright (c) 2019, Ramki A.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').exec;
const ora = require('ora');
const check = require("check-node-version");

/**
 * we pass the object key dependency || devdependency to this function
 * @param {object} deps object key that we want to extract
 * @returns {string} a string of 'dependencies@version'
 * that we can attach to an `npm i {value}` to install
 * every dep the exact version speficied in package.json
 */

const folderName = process.argv[2] || "edxi-react-setup";
let yarn = {}
console.log();

check({}, (error, result) => {

    let yarnR = result.versions.yarn;
    yarn.isSatisfied = yarnR.version ? true : false;

    if (yarn.isSatisfied) {
        yarn.version = yarnR.version;
    }

    exec(`mkdir ${folderName} && cd ${folderName}`, (initErr, initStdout, initStderr) => {
        if (initErr) {
            console.log(`Everything was fine, then it wasn't: ${chalk.redBright(initStderr)}`);
            return;
        }

        console.log(`Creating a new React app in ${chalk.green(`~/${folderName}`)}.`);
        console.log();

        fs
            .copy(path.join(__dirname, 'template'), `${folderName}`)
            .then(() => {
                console.log('Installing packages. This might take a couple of minutes.');

                const spinner = ora(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')} and ${chalk.cyan('react-scripts')}...`);
                spinner.start();

                exec(`cd ${folderName} && ${yarn.isSatisfied ? `yarn` : `npm i`}`, (npmErr, npmStdout, npmStderr) => {
                    if (npmErr) {
                        console.log();
                        console.error(`it's always npm, ain't it? ${npmStderr}`);
                        return;
                    }

                    spinner.succeed();

                    console.log();
                    if (yarn.isSatisfied) {
                        console.log(`yarn add v${yarn.version}`);
                        console.log(`${chalk.cyan('info')} No lockfile found.`);
                    }
                    console.log(npmStdout);

                    console.log(`Success! Created ${folderName} at ~/${folderName}`);
                    console.log("Inside that directory, you can run several comments:")
                    console.log();

                    console.log("We Suggest that you begin by typing:")
                    console.log();
                    console.log(`${chalk.cyan('cd')} ${folderName}`)
                    console.log(chalk.cyan(`${yarn.isSatisfied ? 'yarn' : 'npm'} start`))
                    console.log();

                });

            })
            .catch(err => {
                console.error(err);
                console.log();
            });

    });

});
