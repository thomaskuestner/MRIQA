import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import TabButton from './tabButton';
import Tab from './tab';

Backbone.$ = $;

// TabController view
var TabController = Backbone.View.extend({
    template: _.template($('#tab-controller-template').html()),
    initialize: function(options) {
        this.tabs = options.tabs;
    },
    events: {
        'click .tab-btn': 'clickTabEvent'
    },
    render: function() {
        var self = this;
        this.$el.html(this.template);
        this.tabs.forEach((tab) => {
            self.renderTab(tab);
        }, this);
        return this;
    },
    renderTab: function(tab) {
        var tabButton = new TabButton({tab});
        this.$el.find('#tab-buttons').append(tabButton.render().el);
        var tab = new Tab({tab});
        this.$el.append(tab.render().el);
    },
    clickTabEvent: function(event){
        this.$el.find('.tab').addClass('hidden');
        this.$el.find(`.tab[data-tab-id="${$(event.currentTarget).data('tab-id')}"]`).removeClass('hidden');
    }
});

module.exports = TabController;