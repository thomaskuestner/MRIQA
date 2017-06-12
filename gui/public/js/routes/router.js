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
        this.connection = data.connection;
        this.pipeline = data.pipeline;
        Backbone.Router.prototype.constructor.call(this);
    },
    // all routes
    routes:{
        '': 'index'
    },
    index: function(){
        this.mainWindow = new MainWindow({connection: this.connection, pipeline: this.pipeline});
        RegionManager.show(this.mainWindow);
    }
});

module.exports = Router;