import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    var project = this.store.find('project', params.project_id);
    return project;
  },
});
