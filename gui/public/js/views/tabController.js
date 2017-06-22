import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Models
import TabModel from './../models/tabModel';

// Views
import TabButton from './tabButton';
import Tab from './tab';
import Table from './components/table';
import Chart from './components/chart';

Backbone.$ = $;

// TabController view
var TabController = Backbone.View.extend({
    template: _.template($('#tab-controller-template').html()),
    initialize: function(options) {
        this.tabGroup = options.tabGroup;
        this.pipeline = options.pipeline;
        this.messageGroup = options.messageGroup;
        this.listenTo(this.messageGroup, 'Table', this.componentEvent);
        this.listenTo(this.messageGroup, 'Line', this.componentEvent);
    },
    events: {
        'click .tab-btn': 'clickTabEvent'
    },
    render: function() {
        var self = this;
        this.$el.html(this.template);
        this.tabGroup.each((tabModel) => {
            self.renderTab(tabModel);
        }, this);
        this.$el.find('.tab').parent().removeClass('hidden');
        return this;
    },
    renderTab: function(tabModel) {
        var tabButton = new TabButton({tabModel});
        this.$el.find('#tab-buttons').append(tabButton.render().$el.find('button'));
        var tab = new Tab({tabModel});
        this.$el.append(tab.render().el);
    },
    clickTabEvent: function(event){
        var tab = this.tabGroup.findWhere({id: $(event.currentTarget).data('tab-id')});
        tab.set('notificationCounter', 0);
        this.$el.find('.tab').parent().addClass('hidden');
        this.$el.find(`.tab[data-tab-id="${$(event.currentTarget).data('tab-id')}"]`).parent().removeClass('hidden');
    },
    componentEvent: function(message){
        if(message.get('data').status === 'starting'){
            var tabExists = false;
            var tab = this.tabGroup.filter((tab) => {
                return tab.id === message.get('id');
            });
            if(tab.length === 0){
                var componentName = message.get('component');
                var component = this.pipeline.get('componentGroup').findWhere({id: message.get('id')});
                var view;
                switch (componentName) {
                case 'Table':
                    view = new Table({
                        id: message.get('id'),
                        component,
                        messageGroup: this.messageGroup
                    });
                    break;
                case 'Line':
                    view = new Chart({
                        id: message.get('id'),
                        component,
                        messageGroup: this.messageGroup
                    });
                    break;
                }
                var tabModel = new TabModel({
                    id: message.get('id'),
                    view
                });
                this.tabGroup.add(tabModel);
                this.renderTab(tabModel);
            }
        }
    }
});

module.exports = TabController;