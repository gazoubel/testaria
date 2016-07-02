import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  total: DS.attr('number'),
  startdate: DS.attr('date'),
  enddate: DS.attr('date'),
  project: DS.belongsTo('project',   {async: true}),
  stage: DS.belongsTo('stage',   {async: true, inverse: null}),
  // expenseItems: DS.hasMany('expense-item',   {async: true}),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  totalExpense: Ember.computed('purchaseTransactions.@each.totalExpense', 'purchaseTransactions.[]', function() {
    var pt = this.get('purchaseTransactions');
    if (!pt) {
      return 0;
    }
    return pt.reduce(function(prev, item) {
      var totalExpense = item.get('totalExpense') || 0;
      return (prev || 0) + Number(totalExpense) ;
    });
  })
  // totalExpense: (function() {
  //   var expenseItems = this.get('purchaseTransactions.@each.expenseItems');
  //   if (!expenseItems) {
  //     return 0;
  //   }
  //   return expenseItems.reduce(function(prev, item) {
  //     return (prev || 0) + Number(item.get('total'));
  //   });
  // }).property('purchaseTransactions.@each.expenseItems.@each.total')
});
