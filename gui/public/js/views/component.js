import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

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
        this.listenTo(this.messageGroup, this.component.class[0], this.componentEvent);
    },
    componentEvent: function(message){
        console.log(message);
    },
    render: function() {
        this.$el.attr('transform',`translate(${this.index * 250},0)`);
        this.$el.html(this.template({component: this.component}));
        return this;
    }
});

module.exports = ComponentView;