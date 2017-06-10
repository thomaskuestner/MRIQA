import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Work-Area view
var WorkArea = Backbone.View.extend({
    template: _.template($('#work-area-template').html()),
    initialize: function(options) {
        var self = this;
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = WorkArea;