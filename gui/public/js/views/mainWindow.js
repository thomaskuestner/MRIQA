import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import MainArea from './../views/mainArea';
import LogArea from './../views/logArea';

Backbone.$ = $;

// Main-Window view
var MainWindow = Backbone.View.extend({
    template: _.template($('#main-window-template').html()),
    initialize: function(options) {
        var self = this;
        this.connection = options.connection;
        this.pipeline = options.pipeline;
    },
    render: function() {
        this.$el.html(this.template);
        this.mainArea = new MainArea({connection: this.connection, pipeline: this.pipeline});
        this.$el.find('#main-area').html(this.mainArea.render().$el);
        this.logArea = new LogArea({connection: this.connection});
        this.$el.find('#log-area').html(this.logArea.render().$el);
        return this;
    }
});

module.exports = MainWindow;