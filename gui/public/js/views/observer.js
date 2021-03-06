import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Observer view
var ObserverView = Backbone.View.extend({
    template: _.template($('#observer-template').html()),
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
        this.observer = options.observer;
        this.index = options.index;
    },
    render: function() {
        this.$el.attr('transform', `translate(0,${this.index * -35})`);
        this.$el.html(this.template({observer: this.observer}));
        return this;
    }
});

module.exports = ObserverView;