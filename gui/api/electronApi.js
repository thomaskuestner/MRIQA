var fs = require('fs');

// API for electron specific stuff
module.exports = function(app){
    var response;
    // route for open file dialog and responses with path
    app.get('/api/openFileDialog', function(req, res){
        response = res;
        process.send('openDialog', function(fileNames){
        });
    });

    process.on('message', function(data) {
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
    app.post('/api/getFileContent', function(req, res){
        res.json({
            status: 'SUCCESS',
            data: fs.readFileSync(req.body.file).toString()
        });
    });

    // get process arguments
    app.get('/api/getProcessArgv', function(req, res){
        res.json({
            status: 'SUCCESS',
            data: process.argv.slice(2)
        });
    });
};