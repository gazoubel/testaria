import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  company: DS.belongsTo('company',   {async: true}),
  role: DS.attr('string'),
  uid: DS.attr('string')
});
