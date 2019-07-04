 # !/usr/bin / env node
let spawn = require('child_process').spawn,
path = require('path');

// just check if we even have a git dir
let GitCheck = function () {
    return new Promise((resolve, reject) => {
        let stat = spawn('git', ['status']);
        stat.stdout.on('data', function (data) {
            resolve(data.toString());
        });
        stat.stderr.on('data', function (data) {
            reject(data.toString());
        });
    });
};

// reset commands for git
let commands = {
    keep - changes: 'reset --soft HEAD~1',
    unstage: 'reset'
};

// start process
let dir = path.resolve(process.argv[0] || process.cwd);
GitCheck(dir)
.then((data) => {
    console.log('okay looks like we have a git');
})
.catch ((data) => {
    console.log(data);
});
