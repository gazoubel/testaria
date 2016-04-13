import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      project: this.modelFor("projects.project"),
      projectStage: this.modelFor("projects.project.etapas.etapa"),
      // projectStage:  this.store.find('projectStage', params.project_stage_id)
    });
  },
  actions: {
      save(projectStage){
        this.notifications.success('Saved successfully!', {
          autoClear: true
        });

        // this.notifications.success('saved');
        // notify('info', 'test');
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
