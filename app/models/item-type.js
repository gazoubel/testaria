import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  expenseItems: DS.hasMany('expense-item',   {async: true}),

});
