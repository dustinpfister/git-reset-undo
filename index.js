#!/usr/bin/env node
let spawn = require('child_process').spawn,
path = require('path');

// reset commands for git
let commands = {
    status: ['status'],
    keepChanges: ['reset', '--soft', 'HEAD~1'],
    unstage: ['reset']
};

let log = function (data, type) {
    data = data === undefined ? '' : data;
    type = type === undefined ? 'info' : type;
    console.log(data);
};

let Git = (dir, command) => {
    command = command === undefined ? commands.status : command;
    return new Promise((resolve, reject) => {
        let stat = spawn('git', command, {
                cwd: dir
            });
        stat.stdout.on('data', function (data) {
            // nothing for now
            log(data.toString());
        });
        stat.stderr.on('data', function (data) {
            log(data.toString());
            reject(data.toString());
        });
        stat.on('close', (code) => {
            log('command over...');
            resolve();
        });
    });
};

// start process
let dir = path.resolve(process.argv[2] || process.cwd());
Git(dir, commands.status)
.then((data) => {
    //console.log(data);
    log('okay looks like we have a git');
    log('doing a soft reset...');
    return Git(dir, commands.keepChanges);
})
.then((data) => {

    log('soft reset went well, lets unstage as well...');
    return Git(dir, commands.unstage);

})
.catch ((data) => {
    console.log(data);
});
