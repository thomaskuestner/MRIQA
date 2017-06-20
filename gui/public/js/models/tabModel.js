import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;

// Model for a tab
var Tab = Backbone.Model.extend({
    defaults:{
        'notificationCounter': 0
    },
    initialize: function(){
        this.get('view').tab = this;
    }
});

module.exports = Tab;
