import DS from 'ember-data';

export default DS.Model.extend({
  expenseItems: DS.hasMany('expense-item',   {async: true}),
  otherProjectStage: DS.belongsTo('project-stage',   {async: true}),
  project: DS.belongsTo('project',   {async: true}),
  provider: DS.belongsTo('provider',   {async: true}),
  description: DS.attr('string'),
  purchaseDate: DS.attr('date'),
  purchasePlannedPaymentDate: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',   {async: true}),
  paymentInfo: DS.attr(),
  isPaid: DS.attr('boolean', { defaultValue: false }),
  paymentDate: DS.attr('date'),
  total: DS.attr('number'),
  other: Ember.computed('total','expenseItems.@each.total', 'expenseItems.[]', function() {
    var total = this.get('total');
    var totalExpense = this.get('totalExpense');
    return total - totalExpense;
  }),
  totalExpense: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
    var expenseItems = this.get('expenseItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  // projectStageAssigned: Ember.computed('projectStage', function() {
  //   var projectStage = this.get('projectStage.id');
  //   if (projectStage) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
  numberOfItems: Ember.computed('expenseItems.[]', function() {
    return this.get('expenseItems.length');
  })

});
