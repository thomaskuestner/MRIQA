import $ from 'jquery';

var connection = new WebSocket('ws://localhost:8080');

connection.onopen = function () {
    connection.send('GUI');
};

// Log messages from the server
connection.onmessage = function (event) {
    $('body').append(`<p>${event.data}</p>`);
};