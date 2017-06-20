import Backbone from 'backbone';
import $ from 'jquery';

// Models
import Message from './../models/messageModel';

Backbone.$ = $;

// Collection for websocket messages
var MessageCollection = Backbone.Collection.extend({
    model: Message,
    initialize: function(models, options){
        var self = this;
        this.connection = options.connection;
        this.connection.onmessage = function(event) {
            self.onMessageEvent(event);
        };
    },
    onMessageEvent: function(event){
        var data = JSON.parse(event.data.replace(/'/ig,'"').replace(/\\/ig,'\\\\'));
        var message = new Message(data);
        this.add(message);
        if(message.get('id') === 'undefined'){
            this.trigger(message.get('component'), message);
        }
        else{
            this.trigger(message.get('component'), message);
            this.trigger(message.get('id'), message);
        }
    },
});

module.exports = MessageCollection;
