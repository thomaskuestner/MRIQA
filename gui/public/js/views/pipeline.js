import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import ComponentView from './../views/component';
import PathView from './../views/path';

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
        this.messageGroup = options.messageGroup;
        this.pipeline = options.pipeline;
        this.pipeline.on('change:fileContent', this.fileContentChanged, this);
        this.maxRow = 0;
    },
    render:function() {
        return this;
    },
    fileContentChanged: function(model){
        var width = $('#work-area-panel').outerWidth();
        var height = $('#work-area-panel').outerHeight();
        this.$el.attr('width', width);
        this.$el.attr('height', height);
        this.$el.attr('viewBox',`0 0 ${width} ${height}`);
        var component = model.get('componentGroup').at(0);
        this.recursiveComponent(component, 0, 0);
    },
    recursiveComponent: function(component, index, parentRow){
        var componentView = new ComponentView({messageGroup: this.messageGroup, component, index, row: parentRow, svg: this.$el});
        this.$el.append(componentView.render().el);
        var next_components = component.get('next_components');
        if(next_components){
            ++index;
            next_components.forEach(function(next_component, row) {
                var absoluteRow = row + parentRow;
                if(parentRow === 0 && row > 0){
                    ++this.maxRow;
                    absoluteRow = this.maxRow;
                }
                this.recursiveComponent(next_component, index, absoluteRow);
                this.drawPath(componentView, parentRow, absoluteRow);
            }, this);
        }
    },
    drawPath: function(componentView, fromRow, toRow){
        var pathView = new PathView({fromRow, toRow});
        componentView.$el.append(pathView.render().el);
    }
});

module.exports = PipelineView;