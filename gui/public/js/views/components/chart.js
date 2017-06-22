import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Chart from 'chart.js';

// Models
import TableRow from './../../models/tableRowModel';

// Collections
import TableRowCollection from './../../collections/tableRowCollection';

Backbone.$ = $;

// Table view
var Table = Backbone.View.extend({
    template: _.template($('#chart-view-template').html()),
    className: 'full-height',
    initialize: function(options) {
        this.id = options.id;
        this.component = options.component;
        this.messageGroup = options.messageGroup;
        this.tableRowGroup = new TableRowCollection();
        this.parameterList = new Array();
        this.listenTo(this.tableRowGroup, 'add', this.renderRow);
        this.listenTo(this.messageGroup, this.id, this.componentEvent);
        if(this.component.get('property')){
            // get parameter_list
            var parameterListProperty = this.component.get('property').filter((property) => {
                return property['name'] === 'parameter_list';
            });
            if(parameterListProperty.length > 0){
                var parameters = parameterListProperty[0]['value'].split(',');
                parameters.forEach((parameter) => {
                    this.parameterList.push({
                        index: 0,
                        parameter
                    });
                }, this);
            }
        }
    },
    render: function() {
        this.width = $('#work-area-content').outerWidth() - 15;
        this.height = $('#work-area-content').outerHeight() - 52;
        this.$el.html(this.template);
        var ctx = this.$el.find('#chart');
        $(ctx).attr('height', this.height);
        $(ctx).attr('width', this.width);
        this.chart = new Chart(ctx, {
            type: 'line'
        });
        return this;
    },
    componentEvent: function(message){
        if(message.get('data').status === 'sending'){
            for (var key in message.get('data')){
                var parameter = this.parameterList.filter((parameter) => {
                    return parameter.parameter === key;
                })[0];
                if(typeof parameter !== 'undefined' || this.parameterList.length === 0){
                    if(key !== 'status'){
                        this.tab.set('notificationCounter', parseInt(this.tab.get('notificationCounter')) + 1);
                        var label = this.chart.data.labels.filter((label) => {
                            return label === parameter.index;
                        });
                        if(label.length === 0){
                            this.chart.data.labels.push(parameter.index);
                        }
                        var dataset = this.chart.data.datasets.filter((dataset) => {
                            return dataset.label === key;
                        });
                        if(dataset.length === 0){
                            dataset = {
                                label: key,
                                lineTension: 0,
                                data: new Array()
                            };
                            this.chart.data.datasets.push(dataset);
                        }
                        else{
                            dataset = dataset[0];
                        }

                        dataset.data.push(message.get('data')[key]);
                        this.chart.update();
                        parameter.index++;
                    }
                }
            }
        }
    }
});

module.exports = Table;