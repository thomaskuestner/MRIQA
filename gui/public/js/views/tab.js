import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Tab view
var Tab = Backbone.View.extend({
    template: _.template($('#tab-view-template').html()),
    className: 'full-height hidden',
    initialize: function(options) {
        this.tabModel = options.tabModel;
    },
    render: function() {
        this.$el.html(this.template({id: this.tabModel.get('id')}));
        if(typeof this.tabModel.get('view').render !== 'undefined'){
            this.$el.find(`.tab[data-tab-id="${this.tabModel.get('id')}"] > .panel-body`).html(this.tabModel.get('view').render().el);
        }
        return this;
    }
});

module.exports = Tab;