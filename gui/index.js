'use strict';
var express = require('express');
var http = require('http');
var WebSocket = require('ws');
var fs = require( 'fs' );
var recursive = require('recursive-readdir');
var pythonParser = require('./modules/pythonparser');

var app = express();

// load configurations
app.config = require('../config.json');

app.server = http.createServer(app);

app.componentGroups = new Array();

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
            if(app.componentGroups.length > 0){
                app.componentGroups.forEach(function(componentGroup){
                    if(componentGroup.name === group['name']){
                        addNewGroup = false;
                        foundGroup = componentGroup;
                    }
                });
            }
            if(addNewGroup){
                app.componentGroups.push(group);
            }
            else{
                foundGroup['components'].push(group['components'][0]);
            }
        }
    });
    console.log(app.componentGroups);
});

// access to public folder
app.use(express.static('public'));
app.server.listen(app.config.web_interface_port);

var wss = new WebSocket.Server({ port: app.config.web_socket_port });

var ws_client_gui = null;

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        if(message === 'GUI'){
            ws_client_gui = ws;
        }
        else{
            if(ws_client_gui !== null){
                ws_client_gui.send(message);
            }
        }
    });
});