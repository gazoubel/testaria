import DS from 'ember-data';

export default DS.Model.extend({
  expenseItems: DS.hasMany('expense-item',   {async: true}),
  projectStage: DS.belongsTo('project-stage',   {async: true}),
  project: DS.belongsTo('project',   {async: true}),
  description: DS.attr('string'),
  totalExpense: Ember.computed('expenseItems.@each.total', 'expenseItems.[]', function() {
    var expenseItems = this.get('expenseItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  })
  // totalExpense: (function() {
  //   var expenseItems = this.get('expenseItems');
  //   if (!expenseItems) {
  //     return 0;
  //   }
  //   return expenseItems.reduce(function(prev, item) {
  //     return (prev || 0) + Number(item.get('total'));
  //   });
  // }).property('expenseItems.@each.total') 

});
