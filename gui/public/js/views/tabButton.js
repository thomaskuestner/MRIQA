import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// TabButton view
var TabButton = Backbone.View.extend({
    template: _.template($('#tab-button-template').html()),
    initialize: function(options) {
        this.tab = options.tab;
    },
    render: function() {
        this.$el.html(this.template({id: this.tab.id}));
        return this;
    }
});

module.exports = TabButton;