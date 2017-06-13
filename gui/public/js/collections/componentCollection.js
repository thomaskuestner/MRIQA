import Backbone from 'backbone';
import $ from 'jquery';

// Models
import Component from './../models/componentModel';

Backbone.$ = $;

// Collection for components
var ComponentCollection = Backbone.Collection.extend({
    model: Component
});

module.exports = ComponentCollection;
