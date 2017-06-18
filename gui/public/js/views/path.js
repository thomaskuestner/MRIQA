import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Path view
var PathView = Backbone.View.extend({
    template: _.template($('#path-template').html()),
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
        this.fromRow = options.fromRow;
        this.toRow = options.toRow;
    },
    render: function() {
        var path;
        if(this.fromRow === this.toRow){
            path = 'M 150,10 L 200,10';
        }
        else{
            path = `M 150,20 L 175,20 L 175,${200  * (this.toRow - this.fromRow) + 15} L 200,${200  * (this.toRow - this.fromRow) + 15}`;
        }
        this.$el.html(this.template({path}));
        return this;
    }
});

module.exports = PathView;