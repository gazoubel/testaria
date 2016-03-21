import Ember from 'ember';

export default Ember.Component.extend({
  projectStage: {},
  project: {},
  actions: {
    save(projectStage, project){
      var ref = this;
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
