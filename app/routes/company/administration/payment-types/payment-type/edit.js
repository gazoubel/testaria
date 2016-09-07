import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  model: function (params) {
    return this.modelFor("company.administration.payment-types.payment-type");
  },
  actions: {
    addField(name){
      var controller = this.get('controller');
      var paymentTypeFields = this.get('currentModel.paymentTypeFields');
      var paymentTypeField = this.store.createRecord('payment-type-field', {
        name: name
      });

      paymentTypeFields.addObject(paymentTypeField);

      controller.set('name', '');
      // paymentTypeField.save().then(function() {
      //   paymentTypeFields.save().then(function(){
      //     controller.set('name', '');
      //   });
      // }).catch(function(reason){
      //   baseRef.get('appManager').notify('error', "Error saving payment type:" + reason);
      // });
    },
    save(paymentType){
      var baseRef = this;
      var promises = new Array();
      paymentType.save().then(function(paymentType) {
          paymentType.get('paymentTypeFields').forEach(function(paymentTypefield) {
            promises.push(paymentTypefield.save());
          });
          // ref.get('itemsRemoved').forEach(function(item) {
          //   item.destroyRecord();
          // });
      }, function(error) {
         //developer failed to save;
      });
      Ember.RSVP.all(promises).then(function() {
        baseRef.get('appManager').notify('success', "Payment type saved.");
        this.transitionTo('company.administration.payment-types');
        // ref.sendAction('onSave', purchaseTransaction);
      }, function(error) {
        baseRef.get('appManager').notify('error', "Error saving payment type:" + error.message);
          //one or more languages failed to save
      });


      // paymentType.save().then(
      //   function(){
      //     this.transitionTo('company.administration.payment-types');
      //   },
      //   function(error){
      //     baseRef.get('appManager').notify('error', "Error saving payment type:" + error.message);
      //   }
      // );
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
