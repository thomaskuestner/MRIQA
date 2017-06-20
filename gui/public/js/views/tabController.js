import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import TabButton from './tabButton';
import Tab from './tab';
import Table from './components/table';

Backbone.$ = $;

// TabController view
var TabController = Backbone.View.extend({
    template: _.template($('#tab-controller-template').html()),
    initialize: function(options) {
        this.tabs = options.tabs;
        this.pipeline = options.pipeline;
        this.messageGroup = options.messageGroup;
        this.listenTo(this.messageGroup, 'Table', this.tableComponentEvent);
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
        this.$el.find('.tab').parent().removeClass('hidden');
        return this;
    },
    renderTab: function(tab) {
        var tabButton = new TabButton({tab});
        this.$el.find('#tab-buttons').append(tabButton.render().$el.find('button'));
        var tab = new Tab({tab});
        this.$el.append(tab.render().el);
    },
    clickTabEvent: function(event){
        this.$el.find('.tab').parent().addClass('hidden');
        this.$el.find(`.tab[data-tab-id="${$(event.currentTarget).data('tab-id')}"]`).parent().removeClass('hidden');
    },
    tableComponentEvent: function(message){
        if(message.get('data').status === 'starting'){
            var tabExists = false;
            var tab = this.tabs.filter((tab) => {
                return tab.id === message.get('id');
            });
            if(tab.length === 0){
                var component = this.pipeline.get('componentGroup').findWhere({id: message.get('id')});
                var table = new Table({
                    id: message.get('id'),
                    component,
                    messageGroup: this.messageGroup
                });
                this.tabs.push(table);
                this.renderTab(table);
            }
        }
    }
});

module.exports = TabController;