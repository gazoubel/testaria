import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  description: DS.attr('string'),
  // stage: DS.belongsTo('project-stage',   {async: true}),
  project: DS.belongsTo('project',   {async: true}),
  projectStage: DS.belongsTo('project-stage',   {async: true}),
  itemType: DS.belongsTo('item-type',   {async: true}),
  purchaseTransaction: DS.belongsTo('purchase-transaction',   {async: true}),
  dateAdded: DS.attr('date'),
  projectStageAssigned: Ember.computed('projectStage', function() {
    var projectStage = this.get('projectStage.id');
    if (projectStage) {
      return true;
    } else {
      return false;
    }
  })
});
