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
    events: {
        'input': 'inputEvent'
    },
    render: function() {
        this.$el.html(this.template(this.component.toJSON()));
        return this;
    },
    inputEvent: function(event){
        this.component.set($(event.target).data('setting'), $(event.target).text());
    }
});

module.exports = SettingsView;