import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentView from './../views/component';

Backbone.$ = $;

// Pipeline view
var PipelineView = Backbone.View.extend({
    template: _.template($('#pipeline-view-template').html()),
    tagName: 'svg',
    nameSpace: 'http://www.w3.org/2000/svg',
    _ensureElement: function() {
        if (!this.el) {
            var attrs = _.extend({}, _.result(this, 'attributes'));
            if(this.id) {
                attrs.id = _.result(this, 'id');
            }
            if(this.className) {
                attrs['class'] = _.result(this, 'className');
            }
            var $el = $(window.document.createElementNS(_.result(this, 'nameSpace'), _.result(this, 'tagName'))).attr(attrs);
            this.setElement($el, false);
        } else {
            this.setElement(_.result(this, 'el'), false);
        }
    },
    initialize: function(options) {
        this.connection = options.connection;
        this.pipeline = options.pipeline;
        this.pipeline.on('change:fileContent', this.fileContentChanged, this);
    },
    render:function() {
        return this;
    },
    fileContentChanged: function(model){
        var width = $('#work-area-panel').outerWidth();
        var height = $('#work-area-panel').outerHeight();
        this.$el.attr('width', width);
        this.$el.attr('height', height);
        var self = this;
        var pipeline = model.get('pipeline');
        if(pipeline.component){
            model.get('pipeline').component.forEach(function(component, index) {
                var componentView = new ComponentView({connection: model.get('connection'), component, index, svg: self.svg});
                self.$el.append(componentView.render().el);
            }, this);
        }
    }
});

module.exports = PipelineView;