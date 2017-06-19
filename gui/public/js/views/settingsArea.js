import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import Settings from './settings';

Backbone.$ = $;

// Settings-Area view
var SettingsArea = Backbone.View.extend({
    template: _.template($('#settings-area-template').html()),
    initialize: function(options) {
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    clickComponentEvent: function(component){
        var settings = new Settings({component});
        $('#settings-area-content').html(settings.render().el);
    }
});

module.exports = SettingsArea;