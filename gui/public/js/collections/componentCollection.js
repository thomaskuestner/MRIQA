import Backbone from 'backbone';
import $ from 'jquery';

// Models
import Component from './../models/componentModel';

Backbone.$ = $;

// Collection for components
var ComponentCollection = Backbone.Collection.extend({
    model: Component,
    initialize: function(){
        this.fileContent = '';
        this.listenTo(this, 'remove', this.removeComponentEvent, this);
    },
    generateFileContent: function(){
        this.combineComponentContent(this, 0);
        return this.fileContent;
    },
    combineComponentContent: function(collection, index){
        var component = collection.at(index);
        if(collection.length !== index){
            this.fileContent += component.getContent();
            ++index;
            this.combineComponentContent(collection, index);
        }
    },
    removeComponentEvent: function(deletedComponent){
        this.each((component) => {
            var next_components = component.get('next_components');
            if(next_components){
                component.set('next_components', next_components.filter((next_component) => {
                    return next_component.get('id') !== deletedComponent.get('id');
                }));
            }
        });
    }
});

module.exports = ComponentCollection;
