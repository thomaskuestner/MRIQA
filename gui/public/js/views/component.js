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
        this.index = options.index;
        this.component = options.component;
        this.messageGroup = options.messageGroup;
        this.svg = options.svg;
        this.listenTo(this.messageGroup, this.component.get('class'), this.componentEvent);
    },
    componentEvent: function(message){
        var data = message.get('data');
        if(data.status){
            switch (data.status) {
            case 'pending':
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
        this.svg.attr('viewBox',`-100 0 ${this.index * gap + 500} ${this.svg.attr('height')}`);
        this.$el.attr('transform',`translate(${this.index * gap},${component_y})`);
        this.$el.html(this.template({component: this.component.toJSON()}));

        this.component.get('notifier').forEach(function(notifier, index) {
            var notifierView = new NotifierView({notifier, index});
            this.$el.append(notifierView.render().el);
        }, this);

        this.component.get('observer').forEach(function(observer, index) {
            var observerView = new ObserverView({observer, index});
            this.$el.append(observerView.render().el);
        }, this);
        return this;
    }
});

module.exports = ComponentView;