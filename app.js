// experiment
const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./predict.py',0]);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString(),"klasdfklasf");
        // res.write(data);
        // res.end('end');
    });