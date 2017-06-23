import Backbone from 'backbone';
import $ from 'jquery';
import Router from './routes/router.js';

// Collection
import MessageCollection from './collections/messageCollection';

// Models
import Pipeline from './models/pipelineModel';

// Views
import NavBar from './views/navbar';

Backbone.$ = $;
var connection = new WebSocket('ws://localhost:8080');

connection.onopen = function () {
    connection.send('GUI');
};

// active Pipeline
var pipeline = new Pipeline();
pipeline.set('connection', connection);

// websocket message collection
var messageGroup = new MessageCollection([], {connection});

// Add navigation bar
var navBar = new NavBar({pipeline});
$('#navbar-region').html(navBar.render().el);

new Router({pipeline, messageGroup});
Backbone.history.start();