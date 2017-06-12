import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
var d3 = require('d3');

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
        var width = $('#work-area-panel').outerWidth();
        var height = $('#work-area-panel').outerHeight();
        var self = this;
        this.svg = d3.select('svg');

        this.svg.attr('viewBox', `0 0 ${width} ${height}`)
            .attr('width', width)
            .attr('height', height)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            .style('position', 'absolute')
            .selectAll('svg');

        var pipeline = model.get('pipeline');
        if(pipeline.component){
            model.get('pipeline').component.forEach(function(component) {
            }, this);
        }
    }
});

module.exports = WorkArea;