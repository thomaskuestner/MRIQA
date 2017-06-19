import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Settings view
var SettingsView = Backbone.View.extend({
    template: _.template($('#settings-template').html()),
    initialize: function(options) {
        this.component = options.component;
    },
    render: function() {
        this.$el.html(this.template(this.component.toJSON()));
        return this;
    },
});

module.exports = SettingsView;