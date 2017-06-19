import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// TabController view
var TabController = Backbone.View.extend({
    template: _.template($('#tab-controller-template').html()),
    initialize: function(options) {
        this.tabs = options.tabs;
    },
    events: {
        'click .tab': 'clickTabEvent'
    },
    render: function() {
        var self = this;
        this.$el.html(this.template);
        /*this.tabs.forEach((tab) => {
            self.$el.append(tab.render().el);
        }, this);*/
        return this;
    },
    clickTabEvent: function(event){
        console.log($(event.currentTarget).data());
    }
});

module.exports = TabController;