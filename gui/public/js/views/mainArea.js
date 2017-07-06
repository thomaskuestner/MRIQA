import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentArea from './componentArea';
import WorkArea from './workArea';

Backbone.$ = $;

// Main-Area view
var MainArea = Backbone.View.extend({
    template: _.template($('#main-area-template').html()),
    initialize: function(options) {
        this.messageGroup = options.messageGroup;
        this.pipeline = options.pipeline;
    },
    render: function() {
        this.$el.html(this.template);
        this.componentArea = new ComponentArea({pipeline: this.pipeline});
        this.$el.find('#component-area').html(this.componentArea.render().$el);
        this.workArea = new WorkArea({messageGroup: this.messageGroup, pipeline: this.pipeline});
        this.$el.find('#work-area').html(this.workArea.render().$el);
        return this;
    }
});

module.exports = MainArea;