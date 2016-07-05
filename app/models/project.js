import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  projectStages: DS.hasMany('project-stage',   {async: true}),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  total: DS.attr('number'),
  totalWithProfit: DS.attr('number'),
  totalSpent: Ember.computed('purchaseTransactions.@each.totalExpense', 'purchaseTransactions.[]', function() {
    var pTransactions = this.get('purchaseTransactions');
    if (!pTransactions) {
      return 0;
    }
    return pTransactions.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('totalExpense'));
    });
  }),
  unassignedPurchaseTransaction: Ember.computed('purchaseTransactions.@each', function(){
    return this.get('purchaseTransactions').filterBy('projectStageAssigned', false);
  }),
});
