import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentClass from './componentClassRow';

Backbone.$ = $;

// ComponentRow View
var ComponentRow = Backbone.View.extend({
    template: _.template($('#component-row-template').html()),
    initialize: function() {
    },
    render: function() {
        var self = this;
        var template = this.template(this.model.toJSON());
        this.$el.html(template);
        this.model.get('classes').forEach((componentClass) => {
            var componentClass = new ComponentClass({componentClass});
            self.$el.find('.component-content').append(componentClass.render().el);
        });
        return this;
    }
});

module.exports = ComponentRow;