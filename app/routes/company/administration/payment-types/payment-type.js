import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return  this.store.findRecord('payment-type', params.payment_type_id);
  }
});
