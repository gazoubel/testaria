import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  projectStage: [
    validator('presence', true),
    validator('belongs-to')
  ],
  project: [
      validator('presence', true),
      validator('belongs-to')
  ],
  itemType: [
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
  dateAdded: validator('date'),
  description: validator('presence', true),
});


export default DS.Model.extend(Validations,{
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
