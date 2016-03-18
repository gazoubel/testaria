import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  total: DS.attr('string'),
  dataInicio: DS.attr('string'),
  dataFim: DS.attr('string'),
  project: DS.belongsTo('project',   {async: true}),
  stage: DS.belongsTo('stage',   {async: true}),
});
