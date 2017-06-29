import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import dockerNames from 'docker-names';

Backbone.$ = $;

// ComponentClass View
var ComponentClass = Backbone.View.extend({
    template: _.template($('#component-class-template').html()),
    initialize: function(options) {
        this.componentClass = options.componentClass;
        this.model.set('class', this.componentClass.name);
        if(typeof this.componentClass.description === 'undefined'){
            this.componentClass.description = {
                description: ''
            };
        }
    },
    events: {
        'click .add-button': 'addButtonEvent',
        'click .open-doc-button': 'openDocButtonEvent'
    },
    render: function() {
        var template = this.template(this.componentClass);
        this.$el.html(template);
        return this;
    },
    addButtonEvent: function(){
        this.model.set('id', dockerNames.getRandomName());
    },
    openDocButtonEvent: function(){
        var url;
        if(typeof this.componentClass.description !== 'undefined' && this.componentClass.description.url){
            url = this.componentClass.description.url;
        }
        else{
            url = 'https://github.com/thomaskuestner/MRIQA/wiki';
        }
        var win = window.open(url, '_blank');
        win.focus();
    }
});

module.exports = ComponentClass;