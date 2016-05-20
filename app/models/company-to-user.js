import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company',   {async: true}),
  user: DS.belongsTo('user',   {async: true}),
  role: DS.attr('string')
});
