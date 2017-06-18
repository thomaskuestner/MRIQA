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
        this.fromColumn = options.fromColumn;
        this.toColumn = options.toColumn;
    },
    render: function() {
        var path;
        var offset;
        if(typeof this.fromRow !== 'undefined' || typeof this.toRow !== 'undefined'){
            if(this.fromRow === this.toRow){
                offset = 10;
                path = `M 150,${offset} L 200,${offset}`;
            }
            else{
                offset = 20;
                path = `M 150,${offset} L 175,${offset} L 175,${200  * (this.toRow - this.fromRow) + 15} L 200,${200  * (this.toRow - this.fromRow) + 15}`;
            }
            var arrow = `M 150,${offset} L 160,${offset - 5} L 160,${offset + 5} Z`;
        }
        else{
            var distance = this.fromColumn - this.toColumn;
            path = `M 575,-35 L 575,-125 L ${-225 - 450 * (distance - 1)},-125 L ${-225 - 450 * (distance - 1)},0`;
            var arrow = `M ${-225 - 450 * (distance - 1)},0 L ${-220 - 450 * (distance - 1)},-10 L ${-230 - 450 * (distance - 1)},-10 Z`;
        }
        this.$el.html(this.template({path, arrow}));
        return this;
    }
});

module.exports = PathView;