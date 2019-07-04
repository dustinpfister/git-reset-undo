#!/usr/bin/env node
let spawn = require('child_process').spawn,
path = require('path');

// reset commands for git
let commands = {
    status: ['status'],
    keepChanges: ['reset', '--soft', 'HEAD~1'],
    unstage: ['reset']
};

let Git = (dir, command) => {
    command = command === undefined ? commands.status : command;
    return new Promise((resolve, reject) => {
        let stat = spawn(path.join(dir, 'git'), command);
        stat.stdout.on('data', function (data) {
            resolve(data.toString());
        });
        stat.stderr.on('data', function (data) {
            reject(data.toString());
        });
    });
};

// start process
let dir = path.resolve(process.argv[0] || process.cwd);
Git(dir, commands.status)
.then((data) => {
    console.log(data);
    console.log('okay looks like we have a git');
    console.log('doing a soft reset...');
    return Git(dir, commands.keepChanges);
})
.then(() => {

    console.log('sort reset went well, lets unstage as well...');
    return Git(dir, commands.unstage);

})
.catch ((data) => {
    console.log(data);
});
