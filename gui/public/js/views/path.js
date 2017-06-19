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
            this.$el.html(this.template({path, arrow}));
        }
        else{
            var distance = this.fromColumn - this.toColumn;
            if(distance > 0){
                var start = 575 + 450 * (distance - 1);
                path = `M ${start},-35 L ${start},-125 L -225 ,-125 L -225,0`;
                var arrow = `M ${start},-35 L ${start - 5},-45 L ${start + 5},-45 Z`;
                this.$el.html(this.template({path, arrow}));
            }
        }
        return this;
    }
});

module.exports = PathView;