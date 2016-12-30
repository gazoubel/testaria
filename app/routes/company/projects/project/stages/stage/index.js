import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      projectStage: this.modelFor("company.projects.project.stages.stage")
    });
  },
  actions: {
  }
});
