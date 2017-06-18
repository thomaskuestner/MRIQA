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
            jsonContent.pipeline.component.forEach(function(componentContent, index) {
                var component = new Component({
                    name: componentContent.name[0],
                    class: componentContent.class[0],
                    notifier: ['output'],
                    observer: ['input'],
                    index
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
                }
                componentGroup.add(component);
            }, this);
            componentGroup.each(function(component, index){
                var next_component = componentGroup.at(++index);
                // add next component
                if(next_component){
                    if(next_component && next_component.get('autoglue') === 'false'){
                        var additional_component = next_component.get('additional_component');
                        if(additional_component){
                            var additional_component = componentGroup.findWhere({id: additional_component[0].id[0]});
                            var next_components = additional_component.get('next_components');
                            if(typeof next_components === 'undefined'){
                                next_components = new Array();
                            }
                            next_components.push(next_component);
                            additional_component.set('next_components', next_components);
                        }
                    }
                    else{
                        var next_components = component.get('next_components');
                        if(typeof next_components === 'undefined'){
                            next_components = new Array();
                        }
                        next_components.push(next_component);
                        component.set('next_components', next_components);
                    }
                }

                // add additional notifiers to component
                var additional_components = component.get('additional_component');
                if(additional_components){
                    additional_components.forEach(function(additional_component) {
                        var component = componentGroup.findWhere({id: additional_component.id[0]});
                        var notifier  = component.get('notifier');
                        if(additional_component.notifier){
                            notifier.push(additional_component.notifier[0]);
                            component.set('notifier', notifier);
                        }
                    }, this);
                }
            });
            self.set('componentGroup', componentGroup);
        });
    }
});

module.exports = Pipeline;
