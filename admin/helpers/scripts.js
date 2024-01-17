const { exec } = require('child_process')
module.exports = {
    runUpdatematka: async (callback) => {
        const cmd = `python ./scripts/stmt.py`
        const proc = await exec(cmd);

        let stdout_data = '';

        proc.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        proc.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            stdout_data = data.split('\n').reverse()[1];
        });

        proc.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            if (code) {
                return callback({ success: false, msg: stdout_data })
            } else {
                return callback({ success: true })
            }
        });

        proc.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}