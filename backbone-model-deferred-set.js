(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["underscore","backbone"], function(_, Backbone) {
            // Use global variables if the locals are undefined.
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require("underscore"), require("backbone"));
    } else {
        // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
        factory(_, Backbone);
    }
}(this, function(_, Backbone) {

    var originalInitialize = Backbone.Model.prototype.initialize;
    Backbone.Model.prototype.initialize = function() {
        this.on('request', function(model, xhr) {
            if ( !xhr || !xhr.always ) return;
            xhr.always(_.bind(function() {
                //only delete `this._syncingXhr` if it's the same as the xhr in our closure
                if ( xhr === this._syncingXhr ) {
                    delete this._syncingXhr;
                }
            }, this));
            this._syncingXhr = xhr;

        }, this);

        return originalInitialize.apply(this, arguments);
    };

    Backbone.Model.prototype.deferredSet = function(key, val, options) {
        //grab the current arguments so we can eventually call `set` with them unchanged
        var args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        var doSet = _.bind(function() {
            Backbone.Model.prototype.set.apply(this, args);
        }, this);
        if ( this._syncingXhr ) {
            this._syncingXhr.always(doSet);
        } else {
            doSet();
        }
    };
    return Backbone;
}));
