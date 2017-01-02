
import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  fields: '',
  modelIsInValid: false,
  model: function () {
    return this.store.findAll('payment-type');
  },

  actions: {
      add: function (name){
        var baseRef = this;
        var controller = this.get('controller');

        var paymentType = this.store.createRecord('payment-type', {
          name: name
        });

        controller.set('modelIsInValid', false);
        if (!paymentType.get('validations.isValid')) {
          baseRef.get('appManager').notify('error', paymentType.get('validations.messages'));
          controller.set('modelIsInValid', true);
          paymentType.rollbackAttributes();
          return;
        }

        paymentType.save().then(function() {
          baseRef.get('appManager').notify('success', "paymentType Created");
          controller.set('name', '');
          controller.set('fields', '');
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', "Error creating paymentType:" + reason);
        });
      },
      removeUnit: function (paymentType){
        paymentType.destroyRecord();
      }
    }
});
