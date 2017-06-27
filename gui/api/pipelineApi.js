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
                var date = new Date();
                var message = {
                    component: 'LogServer',
                    data: {
                        log_level: 'SUCCESS',
                        log_message: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDay()).slice(-2)} ${('0' + date.getUTCHours()).slice(-2)}:${('0' + date.getUTCMinutes()).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)} Pipeline saved`
                    }
                };
                if(app.ws_client_gui !== null){
                    app.ws_client_gui.send(JSON.stringify(message));
                }
                res.json({
                    status: 'SUCCESS',
                    data: 'Pipeline saved'
                });
            }
        });
    });
};