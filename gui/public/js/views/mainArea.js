import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentArea from './../views/componentArea';

Backbone.$ = $;

// Main-Area view
var MainArea = Backbone.View.extend({
    template: _.template($('#main-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.connection = options.connection;
    },
    render: function() {
        this.$el.html(this.template);
        this.componentArea = new ComponentArea({connection: this.connection});
        this.$el.find('#component-area').html(this.componentArea.render().$el);
        return this;
    }
});

module.exports = MainArea;