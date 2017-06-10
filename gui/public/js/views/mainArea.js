import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentArea from './../views/componentArea';
import WorkArea from './../views/workArea';
import SettingsArea from './../views/settingsArea';

Backbone.$ = $;

// Main-Area view
var MainArea = Backbone.View.extend({
    template: _.template($('#main-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.connection = options.connection;
    },
    render: function() {
        this.$el.html(this.template);
        this.componentArea = new ComponentArea({connection: this.connection});
        this.$el.find('#component-area').html(this.componentArea.render().$el);
        this.workArea = new WorkArea({connection: this.connection});
        this.$el.find('#work-area').html(this.workArea.render().$el);
        this.settingsArea = new SettingsArea({connection: this.connection});
        this.$el.find('#settings-area').html(this.settingsArea.render().$el);
        return this;
    }
});

module.exports = MainArea;