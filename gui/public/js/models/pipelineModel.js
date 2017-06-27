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
            jsonContent.pipeline.component.forEach((componentContent, index) => {
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
                    var properties = new Array();
                    componentContent.property.forEach((prop) => {
                        var property = {
                            name: prop.name[0]
                        };
                        if(typeof prop.value[0] !== 'object'){
                            property.value = prop.value[0];
                        }
                        else{
                            property.value = prop.value[0]._;
                        }
                        properties.push(property);
                    }, this);
                    component.set('property', properties);
                }
                if(componentContent.autoglue){
                    component.set('autoglue', componentContent.autoglue[0]);
                }
                else{
                    component.set('autoglue', 'true');
                }
                if(componentContent.additional_component){
                    var additional_components = new Array();
                    componentContent.additional_component.forEach((element) => {
                        var additional_component = {
                            id: element.id[0]
                        };
                        if(typeof element.notifier === 'undefined'){
                            additional_component.notifier = 'output';
                        }
                        else{
                            additional_component.notifier = element.notifier;
                        }
                        additional_components.push(additional_component);
                    }, this);
                    component.set('additional_component', additional_components);
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
                            var additional_component = componentGroup.findWhere({id: additional_component[0].id});
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
                    additional_components.forEach((additional_component) => {
                        var component = componentGroup.findWhere({id: additional_component.id});
                        var notifier  = component.get('notifier');
                        if(additional_component.notifier !== 'output'){
                            notifier.push(additional_component.notifier);
                            component.set('notifier', notifier);
                        }
                    }, this);
                }
            });
            self.listenTo(componentGroup, 'change', self.changeEvent);
            self.set('componentGroup', componentGroup);
        });
    },
    changeEvent: function(model){
        // generate new file content
        console.log(model);
    }
});

module.exports = Pipeline;
