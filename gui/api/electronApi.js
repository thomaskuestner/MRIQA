var fs = require('fs');

// API for electron specific stuff
module.exports = function(app){
    var response;
    // route for open file dialog and responses with path
    app.get('/api/openFileDialog', (req, res) => {
        response = res;
    });

    process.on('message', (data) => {
        if(data){
            response.json({
                status: 'SUCCESS',
                data: data
            });
        }
        else{
            response.json({
                status: 'ERROR'
            });
        }
    });

    // get file content
    app.post('/api/getFileContent', (req, res) => {
        res.json({
            status: 'SUCCESS',
            data: fs.readFileSync(req.body.file).toString()
        });
    });

    // get process arguments
    app.get('/api/getProcessArgv', (req, res) => {
        res.json({
            status: 'SUCCESS',
            data: process.argv.slice(2)
        });
    });
};