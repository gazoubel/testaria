/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    'ember-power-select': {
      theme: 'bootstrap'
    }
  });

    app.import('bower_components/bootstrap/dist/css/bootstrap.css');
    app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });
    app.import('bower_components/bootstrap/dist/js/bootstrap.js');

    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',   { destDir: 'fonts' });
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',   { destDir: 'fonts' });
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',   { destDir: 'fonts' });
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',  { destDir: 'fonts' });
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', { destDir: 'fonts' });

    return app.toTree();
};
