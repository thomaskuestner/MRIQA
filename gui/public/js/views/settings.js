import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;

// Settings view
var SettingsView = Backbone.View.extend({
    template: _.template($('#settings-template').html()),
    initialize: function(options) {
        this.component = options.component;
    },
    events: {
        'input': 'inputEvent',
        'click #delete-button': 'deleteButtonEvent'
    },
    render: function() {
        this.$el.html(this.template(this.component.toJSON()));
        return this;
    },
    inputEvent: function(event){
        var type = $(event.target).data('type');
        switch (type) {
        case 'property':
            var properties = this.component.get('property');
            var property = properties.filter((prop) => {
                return prop.name === $(event.target).data('setting');
            })[0];
            property.value._ = $(event.target).text();
            this.component.set('property', properties);
            break;
        case 'additional_component':
            var additional_components = this.component.get('additional_component');
            var additional_component = additional_components.filter((component) => {
                return component.id === $(event.target).data('setting');
            })[0];
            additional_component.notifier[0] = $(event.target).text();
            this.component.set('additional_component', additional_components);
            break;
        default:
            this.component.set($(event.target).data('setting'), $(event.target).text());
            break;
        }
    },
    deleteButtonEvent: function(){
        this.component.collection.remove(this.component);
    }
});

module.exports = SettingsView;