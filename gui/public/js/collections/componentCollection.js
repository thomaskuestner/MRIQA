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
    }
});

module.exports = ComponentCollection;
