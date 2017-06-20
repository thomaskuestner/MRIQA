import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Table row view
var TableRow = Backbone.View.extend({
    template: _.template($('#table-row-template').html()),
    tagName: 'tr',
    initialize: function(options) {
        this.model.on('change:value', this.render, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

module.exports = TableRow;