import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var jQuery = $;
window.$ = window.jQuery = jQuery;

require('bootstrap');

Backbone.$ = $;

// NavBar view
var NavBar = Backbone.View.extend({
    template: _.template($('#navbar-template').html()),
    initialize: function() {
        var self = this;
    },
    events:{
        'click #log-area-view': 'toggleLogAreaView',
        'click #component-area-view': 'toggleComponentAreaView',
        'click #settings-area-view': 'toggleSettingsAreaView'
    },
    toggleLogAreaView: function(event){
        event.preventDefault();
        $('#log-area-panel').toggleClass('hidden');
        $('#log-area-view').find('.glyphicon-ok').toggleClass('hidden');
    },
    toggleComponentAreaView: function(event){
        event.preventDefault();
        $('#component-area-panel').toggleClass('hidden');
        $('#component-area-view').find('.glyphicon-ok').toggleClass('hidden');
    },
    toggleSettingsAreaView: function(event){
        event.preventDefault();
        $('#settings-area-panel').toggleClass('hidden');
        $('#settings-area-view').find('.glyphicon-ok').toggleClass('hidden');
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = NavBar;