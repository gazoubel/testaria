import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.findRecord('purchase-transaction', params.purchase_transaction_id);
  }
});
