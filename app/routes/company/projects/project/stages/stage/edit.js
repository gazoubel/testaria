import Ember from 'ember';
// var inject = Ember.inject;

export default Ember.Route.extend({
  // appManager: inject.service(),
  model: function () {
    return Ember.RSVP.hash({
      project: this.modelFor("company.projects.project"),
      projectStage: this.modelFor("company.projects.project.stages.stage"),
      stages: this.store.findAll('stage'),
      selectedStage: this.modelFor("company.projects.project.stages.stage").get('stage')
      // projectStage:  this.store.find('projectStage', params.project_stage_id)
    });
  },
  actions: {
      save(){
        this.get('appManager').notify('success', 'Saved successfully!');
        this.transitionTo('company.projects.project.stages');
      }
    }
});
