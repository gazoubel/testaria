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
  }),
  projectStageAssigned: Ember.computed('projectStage', function() {
    var projectStage = this.get('projectStage.id');
    if (projectStage) {
      return true;
    } else {
      return false;
    }
    // 
    // return this.get('projectStage').then(function(projectStage){
    //   if (projectStage.get('id')) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
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