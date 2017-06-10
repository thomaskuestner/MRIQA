import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Log-Area view
var LogArea = Backbone.View.extend({
    template: _.template($('#log-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.connection = options.connection;
        // Log messages from the server
        this.connection.onmessage = function(event) {
            self.onMessageEvent(event);
        };
    },
    onMessageEvent: function(event){
        var data = JSON.parse(event.data.replace(/'/ig,'"').replace(/\\/ig,'\\\\'));
        if(data.component === 'LogServer'){
            this.$el.find('#log-area-content').append(`<p class="${data.data.log_level}">${data.data.log_message}</p>`);
            var objDiv = document.getElementById('log-area-content');
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = LogArea;