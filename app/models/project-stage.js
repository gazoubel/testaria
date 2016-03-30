import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  total: DS.attr('number'),
  startdate: DS.attr('date'),
  enddate: DS.attr('date'),
  project: DS.belongsTo('project',   {async: true}),
  stage: DS.belongsTo('stage',   {async: true}),
  expenseItems: DS.hasMany('expense-item',   {async: true}),
});
