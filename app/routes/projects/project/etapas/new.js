import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      project: this.modelFor("projects.project"),
      projectStage: this.store.createRecord('project-stage'),
      stages: this.store.findAll('stage')
    });
  },
  actions: {
      save(projectStage){
        this.transitionTo('projects.project.etapas');
        // var ref = this;
        // var controller = this.get('controller');
        // var project = this.get("currentModel.project");
        // project.get('projectStages').addObject(projectStage);
        //
        // projectStage.save().then(function() {
        //   return project.save().then(function(){
        //     ref.transitionTo('projects.project.etapas');
        //   });
        // }).catch(function(reason){
        //   // this.set('mostrarErro', true);
        // });
      }
    }
});
