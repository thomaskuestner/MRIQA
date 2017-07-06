import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Chart from 'chart.js';

// Collections
import TableRowCollection from './../../collections/tableRowCollection';

Backbone.$ = $;

// Chart view
var ChartView = Backbone.View.extend({
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
            // get type
            var typeProperty = this.component.get('property').filter((property) => {
                return property['name'] === 'type';
            });
            if(typeProperty.length > 0){
                this.type = typeProperty[0].value._;
            }
            else{
                this.type = 'append';
            }

            // get parameter_list
            var parameterListProperty = this.component.get('property').filter((property) => {
                return property['name'] === 'parameter_list';
            });
            if(parameterListProperty.length > 0){
                var parameters = parameterListProperty[0]['value']._.split(',');
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
        var self = this;
        if(message.get('data').status === 'sending'){
            for (var key in message.get('data')){
                var parameter = this.parameterList.filter((parameter) => {
                    return parameter.parameter === key;
                })[0];
                if(typeof parameter !== 'undefined' || this.parameterList.length === 0){
                    if(this.type === 'update'){
                        this.chart.data.datasets.data = [];
                        this.chart.data.labels = [];
                        parameter.index = 0;
                    }
                    if(key !== 'status'){
                        this.tab.set('notificationCounter', parseInt(this.tab.get('notificationCounter')) + 1);
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

                        if(typeof message.get('data')[key] === 'string'){
                            var dataArray = message.get('data')[key].slice(1).slice(0, -1).split('\\n');
                            if(dataArray.length > 0){
                                dataArray.forEach((data) => {
                                    self.chart.data.labels.push(parameter.index);
                                    dataset.data.push(Number(data.slice(2).slice(0, -1)));
                                    parameter.index++;
                                }, this);
                            }
                            else{
                            }
                        }
                        else{
                            var label = this.chart.data.labels.filter((label) => {
                                return label === parameter.index;
                            });
                            if(label.length === 0){
                                this.chart.data.labels.push(parameter.index);
                            }
                            dataset.data.push(message.get('data')[key]);
                            parameter.index++;
                        }
                        this.chart.update();
                    }
                }
            }
        }
    }
});

module.exports = ChartView;