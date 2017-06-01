import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Component-Area view
var ComponentArea = Backbone.View.extend({
    template: _.template($('#component-area-template').html()),
    initialize: function(options) {
        var self = this;
        Backbone.ajax({
            url: '/api/components',
            success: function(res){
                if(res.status === 'SUCCESS'){
                    console.log(res.data);
                }
            }
        });
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = ComponentArea;