import Backbone from 'backbone';
import $ from 'jquery';
import Router from './routes/router.js';

// Views
import NavBar from './views/navbar';

Backbone.$ = $;
var connection = new WebSocket('ws://localhost:8080');

connection.onopen = function () {
    connection.send('GUI');
};

// Add navigation bar
var navBar = new NavBar();
$('#navbar-region').html(navBar.render().el);

var router = new Router({connection});
Backbone.history.start();