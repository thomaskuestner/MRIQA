import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Views
import ComponentRow from './componentRow';

// ComponentGroup View
var ComponentGroupView = Backbone.View.extend({
    template: _.template($('#component-group-template').html()),
    initialize: function(options) {
    },
    render: function() {
        if(typeof this.collection.name === 'undefined'){
            this.collection.name = 'common';
        }
        var template = this.template({name: this.collection.name});
        this.$el.html(template);
        this.renderComponentRows();
        return this;
    },
    renderComponentRows: function(){
        var self = this;
        self.$el.find('#component-group-content').empty();
        this.collection.each((component) => {
            var componentRow = new ComponentRow({model: component});
            self.$el.find('#component-group-content').append(componentRow.render().el);
        });
    },
});

module.exports = ComponentGroupView;