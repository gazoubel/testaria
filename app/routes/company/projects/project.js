import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    console.log('in model of project.js');
    var project = this.store.findRecord('project', params.project_id,{ reload: true });
    return project;
  },
});
