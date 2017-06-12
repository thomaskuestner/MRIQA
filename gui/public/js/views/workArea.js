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

        this.svg.call(d3.zoom()
            .scaleExtent([0.2, 5])
            .on('zoom', function(){
                self.svg.attr('transform', d3.event.transform);
            }));

        this.svg.attr('viewBox', `0 0 ${width} ${height}`)
            .attr('width', width)
            .attr('height', height)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            .style('position', 'absolute')
            .selectAll('svg');

        var pipeline = model.get('pipeline');
        if(pipeline.component){
            model.get('pipeline').component.forEach(function(component, index) {
                if(typeof component.autoglue === 'undefined' || component.autoglue[0] === 'true'){
                    var group = self.svg.append('g')
                        .attr('transform', `translate(${index * 200},0)`);
                    group.insert('rect','g')
                        .attr('width', 150)
                        .attr('height', 100)
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('rx', 2)
                        .attr('ry', 2)
                        .style('fill-opacity', 0)
                        .style('stroke','black')
                        .style('stroke-width', 1);
                    group.insert('text','g')
                        .attr('x', 10)
                        .attr('y', 50)
                        .text(component.name[0]);
                }
            }, this);
        }
    }
});

module.exports = WorkArea;