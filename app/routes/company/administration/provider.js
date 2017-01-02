import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  modelIsInValid: false,
  model: function () {
    return this.store.findAll('provider');
  },

  actions: {
      add: function (name){
        var baseRef = this;
        var controller = this.get('controller');

        var provider = this.store.createRecord('provider', {
          name: name
        });

        controller.set('modelIsInValid', false);
        if (!provider.get('validations.isValid')) {
          baseRef.get('appManager').notify('error', provider.get('validations.messages'));
          controller.set('modelIsInValid', true);
          provider.rollbackAttributes();
          return;
        }

        provider.save().then(function() {
            baseRef.get('appManager').notify('success', "Provider Created");
            controller.set('name', '');
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', "Error creating provider:" + reason);
        });
      },

      remove: function (provider){
        provider.destroyRecord();
      }
    }
});
