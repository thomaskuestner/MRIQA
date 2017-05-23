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
        'click #log-area-view': 'toggleLogAreaView'
    },
    toggleLogAreaView: function(event){
        event.preventDefault();
        $('#log-area-panel').toggleClass('hidden');
        $('#log-area-view').find('.glyphicon-ok').toggleClass('hidden');
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = NavBar;