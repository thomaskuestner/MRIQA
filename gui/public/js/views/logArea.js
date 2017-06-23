import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Log-Area view
var LogArea = Backbone.View.extend({
    template: _.template($('#log-area-template').html()),
    initialize: function(options) {
        this.messageGroup = options.messageGroup;
        this.listenTo(this.messageGroup, 'LogServer', this.componentEvent);
    },
    componentEvent: function(model){
        if(model.get('data').log_level){
            this.$el.find('#log-area-content').append(`<p class="${model.get('data').log_level}">${model.get('data').log_message}</p>`);
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