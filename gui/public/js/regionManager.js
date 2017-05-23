import Backbone from 'backbone';
import $ from 'jquery';

Backbone.$ = $;

// RegionManger is needed for multiple views
var RegionManager = (function (Backbone, $){
    var currentView;
    var el = '#main-region';
    var region = {};

    // close view
    var closeView = function(view){
        if(view && view.close){
            // close loginModal for admin page
            if(view.loginModal){
                view.loginModal.$el.modal('hide');
            }
            view.srollXOffset = window.pageYOffset;
            view.close();
        }
    };

    // open view
    var openView = function(view){
        view.render();
        $(el).html(view.el);
        if(view.onShow){
            view.onShow();
        }
    };

    // show view
    region.show = function(view){
        closeView(currentView);
        currentView = view;
        openView(currentView);
        if(typeof view.srollXOffset !=='undefined'){
            $(document).scrollTop(view.srollXOffset);
        }
    };

    return region;
})(Backbone, $);

module.exports = RegionManager;