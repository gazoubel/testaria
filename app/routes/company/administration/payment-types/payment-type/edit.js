import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  modelIsInValid: false,
  model: function (params) {
    return this.modelFor("company.administration.payment-types.payment-type");
  },
  actions: {
    addField(name){
      var baseRef = this;
      var controller = this.get('controller');
      var paymentTypeFields = this.get('currentModel.paymentTypeFields');
      var paymentTypeField = this.store.createRecord('payment-type-field', {
        name: name
      });

      controller.set('modelIsInValid', false);
      if (!paymentTypeField.get('validations.isValid')) {
        baseRef.get('appManager').notify('error', paymentTypeField.get('validations.messages'));
        controller.set('modelIsInValid', true);
        paymentTypeField.rollbackAttributes();
        return;
      }

      paymentTypeFields.addObject(paymentTypeField);

      controller.set('name', '');
    },
    save(paymentType){
      var baseRef = this;
      var promises = new Array();
      paymentType.save().then(function(paymentType) {
          paymentType.get('paymentTypeFields').forEach(function(paymentTypefield) {
            promises.push(paymentTypefield.save());
          });
      }, function(error) {
         //developer failed to save;
      });
      Ember.RSVP.all(promises).then(function() {
        baseRef.get('appManager').notify('success', "Payment type saved.");
        this.transitionTo('company.administration.payment-types');
      }, function(error) {
        baseRef.get('appManager').notify('error', "Error saving payment type:" + error.message);
      });
    },
    cancel(paymentType){
      paymentType.get('paymentTypeFields').forEach(function(paymentTypefield) {
        paymentTypefield.rollbackAttributes();
      });
      paymentType.rollbackAttributes();
      paymentType.reload();
      this.transitionTo('company.administration.payment-types');
    }
  }
});
