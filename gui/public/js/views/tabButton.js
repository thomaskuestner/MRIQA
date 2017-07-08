import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// TabButton view
var TabButton = Backbone.View.extend({
    template: _.template($('#tab-button-template').html()),
    initialize: function(options) {
        this.tabModel = options.tabModel;
        this.listenTo(this.tabModel, 'change:notificationCounter', this.updateBadge, this);
    },
    render: function() {
        this.$el.html(this.template(this.tabModel.toJSON()));
        return this;
    },
    updateBadge: function(){
        $(`.tab-btn[data-tab-id="${this.tabModel.get('id')}"] > span.notificationCounter`).text(this.tabModel.get('notificationCounter'));
        return this;
    }
});

module.exports = TabButton;