import Backbone from 'backbone';
import $ from 'jquery';

// Models
import Tab from './../models/tabModel';

Backbone.$ = $;

// Collection for Tab
var TabCollection = Backbone.Collection.extend({
    model: Tab
});

module.exports = TabCollection;
