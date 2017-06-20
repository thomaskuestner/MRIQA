import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Views
import NotifierView from './notifier';
import ObserverView from './observer';

Backbone.$ = $;

// Component view
var ComponentView = Backbone.View.extend({
    template: _.template($('#component-template').html()),
    tagName: 'g',
    className: 'component',
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
    events: {
        'click': 'clickEvent',
        'mouseover': 'mouseOverEvent',
        'mouseout': 'mouseOutEvent'
    },
    initialize: function(options) {
        this.index = options.index;
        this.row = options.row;
        this.component = options.component;
        this.messageGroup = options.messageGroup;
        this.clickComponentEvent = options.clickComponentEvent;
        this.svg = options.svg;
        this.listenTo(this.messageGroup, this.component.get('id'), this.componentEvent);
    },
    componentEvent: function(message){
        var data = message.get('data');
        if(data.status){
            switch (data.status) {
            case 'starting':
                this.$el.find('rect.component').attr('stroke', 'green');
                this.$el.find('rect.component').attr('stroke-width', 3);
                break;
            case 'stopped':
                this.$el.find('rect.component').attr('stroke', 'black');
                this.$el.find('rect.component').attr('stroke-width', 1);
            default:
                break;
            }
        }
    },
    render: function() {
        var component_y = 0;
        var gap = 450;
        if(typeof this.component.get('autoglue') !== 'undefined'){
            if(this.component.get('autoglue') === 'false'){
                component_y = 200;
            }
        }
        var viewBoxRegex = new RegExp(/(-?\d*\.?\d+)/g);
        var viewBox = this.svg.attr('viewBox');
        var viewBoxMatch = viewBox.match(viewBoxRegex);
        var width = parseFloat(viewBoxMatch[2]);
        if(width < this.index * gap + 500){
            width = this.index * gap + 500;
        }
        var height = parseFloat(viewBoxMatch[3]);
        if(height < parseFloat(this.svg.attr('height'))){
            height = parseFloat(this.svg.attr('height'));
        }

        this.svg.attr('viewBox',`-100 0 ${width} ${height}`);
        this.$el.attr('transform',`translate(${this.index * gap},${component_y * this.row})`);
        this.$el.html(this.template({component: this.component.toJSON()}));

        this.component.get('notifier').forEach(function(notifier, index) {
            var notifierView = new NotifierView({notifier, index, component: this.component});
            this.$el.append(notifierView.render().el);
        }, this);

        this.component.get('observer').forEach(function(observer, index) {
            var observerView = new ObserverView({observer, index});
            this.$el.append(observerView.render().el);
        }, this);
        return this;
    },
    clickEvent: function(){
        this.clickComponentEvent(this.component);
    },
    mouseOverEvent: function(){
        this.$el.find('rect').attr('stroke-width', 3);
    },
    mouseOutEvent: function(){
        this.$el.find('rect').attr('stroke-width', 1);
    }
});

module.exports = ComponentView;