import Backbone from 'backbone';
import $ from 'jquery';

// Models
import TableRow from './../models/tableRowModel';

Backbone.$ = $;

// Collection for TableRows
var TableRowCollection = Backbone.Collection.extend({
    model: TableRow
});

module.exports = TableRowCollection;
