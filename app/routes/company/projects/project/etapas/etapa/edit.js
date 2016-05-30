import Ember from 'ember';
// var inject = Ember.inject;

export default Ember.Route.extend({
  // appManager: inject.service(),
  model: function (params) {
    return Ember.RSVP.hash({
      project: this.modelFor("company.projects.project"),
      projectStage: this.modelFor("company.projects.project.etapas.etapa"),
      stages: this.store.findAll('stage')
      // projectStage:  this.store.find('projectStage', params.project_stage_id)
    });
  },
  actions: {
      save(projectStage){
        this.get('appManager').notify('success', 'Saved successfully!');

        // this.notifications.success('Saved successfully!', {
        //   autoClear: true
        // });

        // this.notifications.success('saved');
        // notify('info', 'test');
        this.transitionTo('company.projects.project.etapas');
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
