import Ember from 'ember';

export default Ember.Component.extend({
  projectStage: {},
  project: {},
  stages: {},
  // selectedStage: {},
  actions: {
    save(projectStage, project){
      var ref = this;

      if (!projectStage.get('validations.isValid')) {
        ref.get('appManager').notify('error', projectStage.get('validations.messages'));
        return;
      }

      // projectStage.set('stage', this.get('selectedStage'));
      project.get('projectStages').addObject(projectStage);
      projectStage.save().then(function() {
        return project.save().then(function(){
          ref.sendAction('onSave', projectStage);
        });
      }).catch(function(reason){
        // this.set('mostrarErro', true);
      });
    }
  }
});
