import Backbone from 'backbone';
import $ from 'jquery';

// Views
import LogArea from './../views/logArea';

// Extra
import RegionManager from './../regionManager';

Backbone.$ = $;

// Router
var Router = Backbone.Router.extend({
    constructor: function(data){
        this.connection = data.connection;
        Backbone.Router.prototype.constructor.call(this);
    },
    // all routes
    routes:{
        '': 'index'
    },
    index: function(){
        this.logArea = new LogArea({connection: this.connection});
        RegionManager.show(this.logArea);
    }
});

module.exports = Router;