import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  description: DS.attr('string'),
  stage: DS.belongsTo('project-stage',   {async: true}),
  dateAdded: DS.attr('date'),
});
