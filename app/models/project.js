import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  totalWithProfit : [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive : true
    })
  ]
});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  location: DS.attr('string'),
  projectStages: DS.hasMany('project-stage',   {async: true}),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  // total: DS.attr('number'),
  total: Ember.computed('projectStages.@each.total', 'projectStages.[]', function() {
    var projectStages = this.get('projectStages');
    if (!projectStages) {
      return 0;
    }
    return projectStages.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  totalWithProfit: DS.attr('number'),
  expenseItems: DS.hasMany('expense-item',   {async: true}),
  totalSpentInItems: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
    var expenseItems = this.get('expenseItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  totalSpentInOther: Ember.computed('purchaseTransactions.@each.other', 'purchaseTransactions.[]', function() {
    var purchaseTransactions = this.get('purchaseTransactions');
    if (!purchaseTransactions) {
      return 0;
    }
    return purchaseTransactions.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('other'));
    });
  }),
  totalSpent: Ember.computed('totalSpentInOther', 'totalSpentInItems', function() {
    return this.get('totalSpentInItems') + this.get('totalSpentInOther');
  }),
  unassignedPurchaseTransaction: Ember.computed('expenseItems.[]', function(){
    return this.get('expenseItems').filterBy('projectStageAssigned', false);
  }),
  uniquePurchaseTransaction: Ember.computed('expenseItems.@each.{project,purchaseTransaction}', 'expenseItems.[]', function(){
    var uniqueObjects = [];
    this.get('expenseItems').forEach(function(item) {
      // uniqueObjects.addObject(item.get('purchaseTransaction'));
      var purchaseTransaction = item.get('purchaseTransaction');
      if (!uniqueObjects.mapBy('id').contains(purchaseTransaction.get('id'))) {
        uniqueObjects.addObject(purchaseTransaction);
      }
    });
    return uniqueObjects;
  })
});
