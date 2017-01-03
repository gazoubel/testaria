import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  stage: [
    validator('presence', true),
    validator('belongs-to')
  ],
  total : [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive : true
    })
  ],
  // startdate: validator('date'),
  // enddate: validator('date')
});

export default DS.Model.extend(Validations,{
  displayName: DS.attr('string'),
  total: DS.attr('number'),
  startdate: DS.attr('date'),
  enddate: DS.attr('date'),
  project: DS.belongsTo('project',   {async: true}),
  stage: DS.belongsTo('stage',   {async: true, inverse: null}),
  expenseItems: DS.hasMany('expense-item',   {async: true}),
  otherPurchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  totalSpentInItems: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
    var expenseItems = this.get('expenseItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  totalSpentInOther: Ember.computed('otherPurchaseTransactions.@each.other', 'otherPurchaseTransactions.[]', function() {
    var purchaseTransactions = this.get('otherPurchaseTransactions');
    if (!purchaseTransactions) {
      return 0;
    }
    return purchaseTransactions.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('other'));
    });
  }),
  totalSpent: Ember.computed('totalSpentInOther', 'totalSpentInItems', function() {
    let itemsTotal = this.get('totalSpentInItems');
    let othersTotal = this.get('totalSpentInOther');
    return (itemsTotal||0) + (othersTotal||0);
  }),
  // totalExpense: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
  //   var expenseItems = this.get('expenseItems');
  //   if (!expenseItems) {
  //     return 0;
  //   }
  //   return expenseItems.reduce(function(prev, item) {
  //     return (prev || 0) + Number(item.get('total'));
  //   });
  //
  // })
});
