import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var jQuery = $;
window.$ = window.jQuery = jQuery;

require('bootstrap');

Backbone.$ = $;

// NavBar view
var NavBar = Backbone.View.extend({
    template: _.template($('#navbar-template').html()),
    initialize: function(options) {
        this.pipeline = options.pipeline;
        var self = this;
        Backbone.ajax({
            url: '/api/getProcessArgv',
            success: function(res){
                if(res.status === 'SUCCESS'){
                    if(res.data[0]){
                        self.pipeline.set('path', res.data[0]);
                        self.getFileContent(res.data[0]);
                    }
                }
            }
        });
    },
    events:{
        'click #open-file': 'requestOpenFileDialog',
        'click #log-area-view': 'toggleLogAreaView',
        'click #component-area-view': 'toggleComponentAreaView',
        'click #settings-area-view': 'toggleSettingsAreaView',
        'click #start-pipeline': 'requestStartPipeline',
        'click #save-pipeline': 'requestSavePipeline'
    },
    getFileContent: function(file){
        var self = this;
        Backbone.ajax({
            type: 'POST',
            url: '/api/getFileContent',
            data: {
                file
            },
            success: function(res){
                if(res.status === 'SUCCESS'){
                    self.pipeline.set('fileContent', res.data);
                }
            }
        });
    },
    toggleLogAreaView: function(event){
        event.preventDefault();
        $('#log-area').toggleClass('hidden');
        $('#log-area-view').find('.glyphicon-ok').toggleClass('hidden');
        if($('#log-area').hasClass('hidden')){
            $('.container-fluid').attr('style', 'height:calc(100% - 100px); margin-bottom:0px;');
        }
        else{
            $('.container-fluid').attr('style', '');
        }
    },
    requestOpenFileDialog: function(){
        var self = this;
        Backbone.ajax({
            url: '/api/openFileDialog',
            success: function(res){
                if(res.status === 'SUCCESS'){
                    self.pipeline.set('path', res.data);
                    self.getFileContent(res.data);
                }
            }
        });
    },
    requestStartPipeline: function(){
        Backbone.ajax({
            type: 'POST',
            url: '/api/startPipeline',
            data: {
                path: this.pipeline.get('path').replace('../', '')
            }
        });
    },
    requestSavePipeline: function(){
        Backbone.ajax({
            type: 'POST',
            url: '/api/savePipeline',
            data: {
                path: this.pipeline.get('path'),
                content: this.pipeline.get('fileContent')
            }
        });
    },
    toggleComponentAreaView: function(event){
        event.preventDefault();
        $('#component-area').toggleClass('hidden');
        $('#component-area-view').find('.glyphicon-ok').toggleClass('hidden');
        this.setWorkAreaWidth();
    },
    toggleSettingsAreaView: function(event){
        event.preventDefault();
        $('#settings-area').toggleClass('hidden');
        $('#settings-area-view').find('.glyphicon-ok').toggleClass('hidden');
        this.setWorkAreaWidth();
    },
    setWorkAreaWidth: function(){
        if($('#component-area').hasClass('hidden') && $('#settings-area').hasClass('hidden')){
            $('#work-area').attr('class', 'col-lg-12 col-md-12 col-sm-12 col-xs-12');
        }
        else if($('#component-area').hasClass('hidden') || $('#settings-area').hasClass('hidden')){
            $('#work-area').attr('class', 'col-lg-10 col-md-10 col-sm-10 col-xs-10');
        }
        else{
            $('#work-area').attr('class', 'col-lg-8 col-md-8 col-sm-8 col-xs-8');
        }
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    }
});

module.exports = NavBar;