import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import PipelineView from './../views/pipeline';

Backbone.$ = $;

// Work-Area view
var WorkArea = Backbone.View.extend({
    template: _.template($('#work-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.messageGroup = options.messageGroup;
        this.pipeline = options.pipeline;
    },
    render: function() {
        this.$el.html(this.template);
        this.pipelineView = new PipelineView({messageGroup: this.messageGroup, pipeline: this.pipeline});
        this.$el.find('#work-area-content').html(this.pipelineView.render().$el);
        return this;
    }
});

module.exports = WorkArea;