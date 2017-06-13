import Backbone from 'backbone';
import $ from 'jquery';

// Views
import MainWindow from './../views/mainWindow';

// Extra
import RegionManager from './../regionManager';

Backbone.$ = $;

// Router
var Router = Backbone.Router.extend({
    constructor: function(data){
        this.pipeline = data.pipeline;
        this.messageGroup = data.messageGroup;
        Backbone.Router.prototype.constructor.call(this);
    },
    // all routes
    routes:{
        '': 'index'
    },
    index: function(){
        this.mainWindow = new MainWindow({pipeline: this.pipeline, messageGroup: this.messageGroup});
        RegionManager.show(this.mainWindow);
    }
});

module.exports = Router;