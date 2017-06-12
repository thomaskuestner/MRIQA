import Backbone from 'backbone';
import $ from 'jquery';
import Router from './routes/router.js';

// Models
import Pipeline from './models/pipelineModel';

// Views
import NavBar from './views/navbar';

Backbone.$ = $;
var connection = new WebSocket('ws://localhost:8080');

connection.onopen = function () {
    connection.send('GUI');
};

// actice Pipeline
var pipeline = new Pipeline();

// Add navigation bar
var navBar = new NavBar({pipeline});
$('#navbar-region').html(navBar.render().el);

var router = new Router({connection, pipeline});
Backbone.history.start();