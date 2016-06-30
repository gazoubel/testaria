import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  description: DS.attr('string'),
  // stage: DS.belongsTo('project-stage',   {async: true}),
  // project: DS.belongsTo('project',   {async: true}),
  itemType: DS.belongsTo('item-type',   {async: true}),
  purchaseTransaction: DS.belongsTo('purchase-transaction',   {async: true}),
  dateAdded: DS.attr('date'),
});
