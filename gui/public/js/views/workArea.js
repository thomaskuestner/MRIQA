import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Work-Area view
var WorkArea = Backbone.View.extend({
    template: _.template($('#work-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.connection = options.connection;
        this.pipeline = options.pipeline;
        this.pipeline.on('change:fileContent', this.fileContentChanged);
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    fileContentChanged: function(model){
        // draw pipeline
    }
});

module.exports = WorkArea;