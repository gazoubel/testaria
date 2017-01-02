import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  modelIsInValid: false,
  model: function () {
    return this.store.findAll('stage');
  },

  actions: {
      addStage: function (name, acronym){
        var controller = this.get('controller');
        var stage = this.store.createRecord('stage', {
          name: name,
        });

        controller.set('modelIsInValid', false);
        if (!stage.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          stage.rollbackAttributes();
          return;
        }

        stage.save().then(function() {
            controller.set('name', '');
        }).catch(function(reason){
          this.set('mostrarErro', true);
        });
      },
      removeStage: function (stage){
        stage.destroyRecord();
      }
    }
});
