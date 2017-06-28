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
        'input': 'inputEvent'
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
        default:
            this.component.set($(event.target).data('setting'), $(event.target).text());
            break;
        }
    }
});

module.exports = SettingsView;