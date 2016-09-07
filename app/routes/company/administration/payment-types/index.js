
import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  fields: '',
  model: function () {
    return this.store.findAll('payment-type');
  },

  actions: {
      add: function (name, fields){
        var controller = this.get('controller');

        // var company = this.get("currentModel");

        var paymentType = this.store.createRecord('payment-type', {
          name: name,
          fields: fields
        });

        // company.get('units').addObject(unit);

        paymentType.save().then(function() {
          // return company.save().then(function(){
            controller.set('name', '');
            controller.set('fields', '');
          // });
        }).catch(function(reason){
          this.set('mostrarErro', true);
        });
      },
      removeUnit: function (paymentType){
        paymentType.destroyRecord();
      }
    }
});
