import Backbone from 'backbone';
import $ from 'jquery';
import xml2js from 'xml2js';

// Collections
import ComponentCollection from './../collections/componentCollection';

// Models
import Component from './componentModel';

Backbone.$ = $;

// Model for a pipeline
var Pipeline = Backbone.Model.extend({
    default:{
        fileContent: ''
    },
    initialize: function(){
        this.on('change:fileContent', this.parseXmlPipeline);
    },
    parseXmlPipeline: function(model){
        var self = this;
        var parser = new xml2js.Parser();
        var componentGroup = new ComponentCollection();
        parser.parseString(model.get('fileContent'), function(error, jsonContent){
            self.set('pipeline', jsonContent.pipeline);
            jsonContent.pipeline.component.forEach(function(componentContent) {
                var component = new Component({
                    name: componentContent.name[0],
                    class: componentContent.class[0],
                    notifier: ['output'],
                    observer: ['input']
                });
                if(componentContent.id){
                    component.set('id', componentContent.id[0]);
                }
                if(componentContent.property){
                    component.set('property', componentContent.property);
                }
                if(componentContent.autoglue){
                    component.set('autoglue', componentContent.autoglue[0]);
                }
                if(componentContent.additional_component){
                    component.set('additional_component', componentContent.additional_component);
                    componentContent.additional_component.forEach(function(additional_component) {
                        if(additional_component.notifier){
                            var notifier = component.get('notifier');
                            notifier.push(additional_component.notifier[0]);
                            component.set('notifier', notifier);
                        }
                    }, this);
                }
                componentGroup.add(component);
            }, this);
            self.set('componentGroup', componentGroup);
        });
    }
});

module.exports = Pipeline;
