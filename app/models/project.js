import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  projectStages: DS.hasMany('project-stage',   {async: true}),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  total: DS.attr('number'),
  totalWithProfit: DS.attr('number'),
  expenseItems: DS.hasMany('expense-item',   {async: true}),
  totalSpent: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
    var expenseItems = this.get('expenseItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  unassignedPurchaseTransaction: Ember.computed('expenseItems.[]', function(){
    return this.get('expenseItems').filterBy('projectStageAssigned', false);
  }),
  uniquePurchaseTransaction: Ember.computed('expenseItems.@each.project', 'expenseItems.[]', function(){
    var uniqueObjects = [];
    this.get('expenseItems').forEach(function(item) {
      var purchaseTransaction = item.get('purchaseTransaction');
      if (!uniqueObjects.mapBy('id').contains(purchaseTransaction.get('id'))) {
        uniqueObjects.addObject(purchaseTransaction);
      }
    });
    return uniqueObjects;
  }),
});
