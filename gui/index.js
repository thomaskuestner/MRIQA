'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var WebSocket = require('ws');

var app = express();

// use bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

// load configurations
app.config = require('../config.json');

app.server = http.createServer(app);

// Load Component-API
require('./api/componentApi')(app);

// load Electron API
require('./api/electronApi')(app);

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