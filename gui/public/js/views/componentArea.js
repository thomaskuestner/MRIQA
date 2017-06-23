import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Collections
import ComponentCollection from './../collections/componentCollection';

// Models
import Component from './../models/componentModel';

// Views
import ComponentGroupView from './componentGroup';

// Component-Area view
var ComponentArea = Backbone.View.extend({
    template: _.template($('#component-area-template').html()),
    initialize: function() {
        var self = this;
        Backbone.ajax({
            url: '/api/components',
            success: function(res){
                if(res.status === 'SUCCESS'){
                    self.componentGroupCollectionRes = res.data;
                    self.renderComponentGroups();
                }
            }
        });
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    renderComponentGroups: function(){
        this.componentGroupCollection = new Array();
        this.componentGroupCollectionRes.forEach(function(componentGroupRes) {
            var componentGroup = new ComponentCollection();
            componentGroup.name = componentGroupRes.name;
            componentGroupRes.components.forEach((componentRes) => {
                var component = new Component(componentRes);
                componentGroup.add(component);
            }, this);
            this.componentGroupCollection.push(componentGroup);
        }, this);
        this.componentGroupCollection.forEach(function(componentGroup){
            var componentGroupView = new ComponentGroupView({collection: componentGroup});
            this.$el.find('#component-area-content').append(componentGroupView.render().el);
        }, this);
    }
});

module.exports = ComponentArea;