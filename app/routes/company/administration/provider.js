import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
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

        provider.save().then(function() {
            baseRef.get('appManager').notify('success', "Provider Created");
            controller.set('name', '');
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', "Error creating user:" + reason);
        });
      },

      remove: function (provider){
        provider.destroyRecord();
      }
    }
});
