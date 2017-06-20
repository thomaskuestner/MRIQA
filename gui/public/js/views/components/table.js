import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// Models
import TableRow from './../../models/tableRowModel';

// Collections
import TableRowCollection from './../../collections/tableRowCollection';

// Views
import TableRowView from './tableRow';

Backbone.$ = $;

// Table view
var Table = Backbone.View.extend({
    template: _.template($('#table-view-template').html()),
    initialize: function(options) {
        this.id = options.id;
        this.component = options.component;
        this.messageGroup = options.messageGroup;
        this.tableRowGroup = new TableRowCollection();
        this.parameterList = new Array();
        this.listenTo(this.tableRowGroup, 'add', this.renderRow);
        this.listenTo(this.messageGroup, this.id, this.componentEvent);
        if(this.component.get('property')){
            // get type append or update
            var typeProperty = this.component.get('property').filter((property) => {
                return property['name'] === 'type';
            });
            if(typeProperty.length > 0){
                this.type = typeProperty[0]['value'];
            }

            // get parameter_list
            var parameterListProperty = this.component.get('property').filter((property) => {
                return property['name'] === 'parameter_list';
            });
            if(parameterListProperty.length > 0){
                this.parameterList = parameterListProperty[0]['value'].split(',');
            }
        }
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    renderRow: function(tableRow){
        var tableRowView = new TableRowView({model: tableRow});
        this.$el.find('tbody').append(tableRowView.render().el);
    },
    componentEvent: function(message){
        if(message.get('data').status === 'sending'){
            for (var key in message.get('data')){
                if(this.parameterList.indexOf(key) > -1 || this.parameterList.length === 0){
                    if(key !== 'status'){
                        var tableRow = new TableRow({key, value: message.get('data')[key]});
                        switch (this.type) {
                        case 'append':
                            this.tableRowGroup.add(tableRow);
                            break;
                        case 'update':
                            var updateRow = this.tableRowGroup.findWhere({key});
                            if(typeof updateRow === 'undefined'){
                                updateRow = tableRow;
                                this.tableRowGroup.add(updateRow);
                            }
                            else{
                                updateRow.set('value', message.get('data')[key]);
                            }
                            break;
                        default:
                            this.tableRowGroup.add(tableRow);
                            break;
                        }
                    }
                }
            }
        }
    }
});

module.exports = Table;