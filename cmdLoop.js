/*
    Cmd Line Tool to loop a cmd Line instruction and save the executions results
*/

'use strict';
const { execSync } = require('child_process');
const argv = require('yargs')
    .option('cmd', {
        alias: 'c',
        describe: 'Command Line instruction to execute',
        demandOption: true
    })
    .option('number', {
        alias: 'n',
        describe: 'How many times the instruction should be executed',
        demandOption: true
    })
    .option('timeOut', {
        alias: 't',
        describe: 'How many seconds to wait in between commands',
        demandOption: false
    })
    .help()
    .argv;

const pathToLog =  './cmdLoop.log';
const loopCounter = argv.number ;
const cmdToExe = argv.cmd;
const cmdTimeOut = argv.timeOut ? argv.timeOut : 0;
var errorLogStrings = '';
var errorsNumber = 0;
var successRate = 0;

for(let i = 1; i <= loopCounter; i++) {
    try {
        execSync(cmdToExe,{stdio:[0,1,2]});
    } catch( err ) {
        errorsNumber++;
        console.log(`${i} : ${err.status}`);
        console.log(err.stdout);
        console.log(err.stderr);
    }
}
successRate = 100 - Math.round( (errorsNumber/ loopCounter) * 100);
console.log('\x1b[33m%s\x1b[0m: ', 'Success Rate: ' + successRate + ' %');
