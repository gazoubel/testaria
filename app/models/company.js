import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  users: DS.hasMany('user',   {async: true}),
  units: DS.hasMany('unit',   {async: true}),
  stages: DS.hasMany('stage',   {async: true}),
  projects: DS.hasMany('project',   {async: true})
});
