import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  // company: DS.belongsTo('company',   {async: true}),
  projectStages: DS.hasMany('project-stage',   {async: true}),
});
