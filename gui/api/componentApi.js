var fs = require( 'fs' );
var recursive = require('recursive-readdir');
var pythonParser = require('../modules/pythonparser');

module.exports = function(app){
    // get all components
    app.get('/api/components', function(req, res){
        var componentGroups = new Array();
        recursive('../components/', function(error, files){
            if(error){
                process.exit(1);
            }

            files.forEach(function(file, index){
                var pythonFile = new RegExp(/.py$/);
                var group = {};
                if(pythonFile.test(file)){
                    var regex = new RegExp(/\.\.\/components(\/(\w*))?\/(\w*).py/);
                    var match = regex.exec(file);
                    var classes = pythonParser.parse(file);
                    if(match !== null && classes.length > 0){
                        group['name'] = match[2];
                        group['components'] = new Array();
                        group['components'].push({
                            'name': match[3],
                            'classes': pythonParser.parse(file)
                        });
                    }
                }
                if(Object.keys(group).length !== 0){
                    var addNewGroup = true;
                    var foundGroup;
                    if(componentGroups.length > 0){
                        componentGroups.forEach(function(componentGroup){
                            if(componentGroup.name === group['name']){
                                addNewGroup = false;
                                foundGroup = componentGroup;
                            }
                        });
                    }
                    if(addNewGroup){
                        componentGroups.push(group);
                    }
                    else{
                        foundGroup['components'].push(group['components'][0]);
                    }
                }
            });
            res.json({
                status:'SUCCESS',
                data: componentGroups
            });
        });
    });
};