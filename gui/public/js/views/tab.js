import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Tab view
var Tab = Backbone.View.extend({
    template: _.template($('#tab-view-template').html()),
    className: 'full-height hidden',
    initialize: function(options) {
        this.tab = options.tab;
    },
    render: function() {
        this.$el.html(this.template({id: this.tab.id}));
        if(typeof this.tab.render !== 'undefined'){
            this.$el.find(`.tab[data-tab-id="${this.tab.id}"] > .panel-body`).html(this.tab.render().el);
        }
        return this;
    }
});

module.exports = Tab;