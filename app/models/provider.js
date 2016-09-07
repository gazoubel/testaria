import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
});
