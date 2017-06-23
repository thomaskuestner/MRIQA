import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Models
import TabModel from './../models/tabModel';

// Collection
import TabCollection from './../collections/tabCollection';

// Views
import PipelineView from './pipeline';
import SettingsArea from './settingsArea';
import TabController from './tabController';

Backbone.$ = $;

// Work-Area view
var WorkArea = Backbone.View.extend({
    template: _.template($('#work-area-template').html()),
    initialize: function(options) {
        this.messageGroup = options.messageGroup;
        this.pipeline = options.pipeline;
        this.tabGroup = new TabCollection();
    },
    render: function() {
        this.$el.html(this.template);
        this.settingsArea = new SettingsArea();
        this.$el.find('#settings-area').html(this.settingsArea.render().$el);
        this.pipelineView = new PipelineView({
            id: 'pipeline',
            messageGroup: this.messageGroup,
            pipeline: this.pipeline,
            clickComponentEvent: this.settingsArea.clickComponentEvent
        });
        var tabModel = new TabModel({
            id: 'pipeline',
            view: this.pipelineView
        });
        this.tabGroup.add(tabModel);
        this.tabController = new TabController({
            messageGroup: this.messageGroup,
            pipeline: this.pipeline,
            tabGroup: this.tabGroup
        });
        this.$el.find('#work-area-content').html(this.tabController.render().$el);
        return this;
    }
});

module.exports = WorkArea;