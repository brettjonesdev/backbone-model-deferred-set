require.config({
    shim:{
        "backbone":{
            "exports":"Backbone",
            "deps": ["underscore", "jquery"]
        },
        "jquery": {
            "exports": "$"
        }
    },
    paths: {
        jquery:     'bower_components/jQuery/dist/jquery',
        backbone:   'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore',
        json:       'bower_components/requirejs-plugins/src/json',
        text:       'bower_components/text/text'
    }
});
