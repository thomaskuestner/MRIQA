import Backbone from 'backbone';
import $ from 'jquery';

// Models
import Component from './../models/componentModel';

Backbone.$ = $;

// Collection for components
var ComponentCollection = Backbone.Collection.extend({
    model: Component,
    // sorts the elements in the collection by id for verification
    comparator: function(item){
        return item.get('name');
    }
});

module.exports = ComponentCollection;
