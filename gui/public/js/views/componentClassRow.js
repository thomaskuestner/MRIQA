import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// ComponentClass View
var ComponentClass = Backbone.View.extend({
    template: _.template($('#component-class-template').html()),
    initialize: function(options) {
        this.componentClass = options.componentClass;
    },
    render: function() {
        var template = this.template({name: this.componentClass});
        this.$el.html(template);
        return this;
    }
});

module.exports = ComponentClass;