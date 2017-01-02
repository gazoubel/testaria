import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  modelIsInValid: false,
  model: function () {
    return this.store.findAll('stage');
  },

  actions: {
      addStage: function (name, acronym){
        var baseRef = this;
        var controller = this.get('controller');
        var stage = this.store.createRecord('stage', {
          name: name,
        });

        controller.set('modelIsInValid', false);
        if (!stage.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          baseRef.get('appManager').notify('error', stage.get('validations.messages'));
          stage.rollbackAttributes();
          return;
        }

        stage.save().then(function() {
            controller.set('name', '');
            baseRef.get('appManager').notify('success', "Stage Created");
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', "Error creating stage:" + reason);
        });
      },
      removeStage: function (stage){
        stage.destroyRecord();
      }
    }
});
