import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('administration', function() {
    this.route('units');
    this.route('stages');
  });
  this.route('projects', function() {
    this.route('new');

    this.route('project', {
      path: ':id'
    }, function() {
      this.route('etapas', function() {
        this.route('new');
      });
    });
  });
});

export default Router;
