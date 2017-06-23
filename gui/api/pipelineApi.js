var { spawn } = require('child_process');

module.exports = function(app){
    // start a pipeline
    app.post('/api/startPipeline', (req, res) => {
        var python = spawn('bash', ['startPipeline.sh', req.body.path]);
        python.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        python.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            console.log(`pipeline exited with code ${code}`);
        });
        res.json({
            status: 'SUCCESS',
            data: 'Pipeline started'
        });
    });
};