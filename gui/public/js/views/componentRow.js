import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// ComponentGroup View
var ComponentRow = Backbone.View.extend({
    template: _.template($('#component-row-template').html()),
    initialize: function(options) {
    },
    render: function() {
        console.log(this.model.toJSON());
        var template = this.template(this.model.toJSON());
        this.$el.html(template);
        return this;
    }
});

module.exports = ComponentRow;