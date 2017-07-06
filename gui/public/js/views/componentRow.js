import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentClass from './componentClassRow';

Backbone.$ = $;

// ComponentRow View
var ComponentRow = Backbone.View.extend({
    template: _.template($('#component-row-template').html()),
    initialize: function(options) {
        this.pipeline = options.pipeline;
    },
    render: function() {
        var self = this;
        var template = this.template(this.model.toJSON());
        this.$el.html(template);
        this.model.get('classes').forEach((componentClass) => {
            var componentClass = new ComponentClass({model: this.model, componentClass, pipeline: self.pipeline});
            self.$el.find('.component-content').append(componentClass.render().el);
        });
        return this;
    }
});

module.exports = ComponentRow;