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

// start process
let dir = path.resolve(process.argv[0] || process.cwd);
GitCheck(dir)
.then((data) => {
    console.log('okay looks like we have a git');
})
.catch ((data) => {
    console.log(data);
});
