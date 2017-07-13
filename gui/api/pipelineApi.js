var fs = require('fs');
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
            app.sendLog(data, 'ERROR');
        });

        python.on('close', (code) => {
            console.log(`pipeline exited with code ${code}`);
        });
        res.json({
            status: 'SUCCESS',
            data: 'Pipeline started'
        });
    });

    // save a pipeline
    app.post('/api/savePipeline', (req, res) => {
        fs.writeFile(req.body.path, req.body.content, (error) => {
            if(error){
                res.json({
                    status: 'ERROR',
                    data: 'Pipeline not saved'
                });
            }
            else{
                app.sendLog('Pipeline saved', 'SUCCESS');
                res.json({
                    status: 'SUCCESS',
                    data: 'Pipeline saved'
                });
            }
        });
    });
};