import Backbone from 'backbone';
import $ from 'jquery';
import xml2js from 'xml2js';

Backbone.$ = $;

// Model for a component
var Component = Backbone.Model.extend({
    getContent: function(){
        var builder = new xml2js.Builder({
            rootName: 'component',
            headless: true,
            renderOpts: {
                'pretty': true,
                'indent': '    ',
                'newline': '\n'
            }
        });
        var jsonObject = this.toJSON();

        // reorder
        var jsonObject = {
            id: this.toJSON().id,
            name: this.toJSON().name,
            class: this.toJSON().class,
            autoglue: this.toJSON().autoglue
        };

        if(this.get('property')){
            jsonObject.property = this.toJSON().property;
        }

        if(this.get('additional_component')){
            jsonObject.additional_component = this.toJSON().additional_component;
        }
        var xml = builder.buildObject(jsonObject);
        return `${xml}\n`;
    }
});

module.exports = Component;
