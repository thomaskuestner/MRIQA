import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import PipelineView from './pipeline';
import SettingsArea from './settingsArea';
import TabController from './tabController';

Backbone.$ = $;

// Work-Area view
var WorkArea = Backbone.View.extend({
    template: _.template($('#work-area-template').html()),
    initialize: function(options) {
        var self = this;
        this.messageGroup = options.messageGroup;
        this.pipeline = options.pipeline;
    },
    render: function() {
        this.$el.html(this.template);
        this.settingsArea = new SettingsArea();
        this.$el.find('#settings-area').html(this.settingsArea.render().$el);
        this.pipelineView = new PipelineView({messageGroup: this.messageGroup, pipeline: this.pipeline, clickComponentEvent: this.settingsArea.clickComponentEvent});
        this.tabController = new TabController({tabs: [this.pipelineView]});
        this.$el.find('#work-area-content').html(this.tabController.render().$el);
        /*this.pipelineView = new PipelineView({messageGroup: this.messageGroup, pipeline: this.pipeline, clickComponentEvent: this.settingsArea.clickComponentEvent});
        this.$el.find('#work-area-content').html(this.pipelineView.render().$el);*/
        return this;
    }
});

module.exports = WorkArea;