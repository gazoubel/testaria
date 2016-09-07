import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params, transition) {
      var project = this.modelFor("company.projects.project");
      project.reload();
      return Ember.RSVP.hash({
        project: project
      });
  }
});
