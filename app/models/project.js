import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  // company: DS.belongsTo('company',   {async: true}),
  projectStages: DS.hasMany('project-stage',   {async: true}),
  // expenseItems: DS.hasMany('expense-item',   {async: true}),
  purchaseTransactions: DS.hasMany('purchase-transaction',   {async: true}),
  total: DS.attr('number'),
  // expenseItems: Ember.computed('projectStages.@each.expenseItems.[]', function() {
  //   var expenseItemsAggregate = [];
  //   this.get('projectStages').forEach(function(projectStage) {
  //     projectStage.get('expenseItems').forEach(function(expenseItem) {
  //        expenseItemsAggregate.pushObject(expenseItem);
  //     });
  //   });
  //
  //   return expenseItemsAggregate;
  // })
});
