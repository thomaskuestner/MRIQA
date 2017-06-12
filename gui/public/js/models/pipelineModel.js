import Backbone from 'backbone';
import $ from 'jquery';
import xml2js from 'xml2js';

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
        parser.parseString(model.get('fileContent'), function(error, jsonContent){
            self.set('pipeline', jsonContent.pipeline);
        });
    }
});

module.exports = Pipeline;
