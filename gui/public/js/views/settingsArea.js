import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Settings-Area view
var SettingsArea = Backbone.View.extend({
    template: _.template($('#settings-area-template').html()),
    initialize: function(options) {
        var self = this;
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = SettingsArea;