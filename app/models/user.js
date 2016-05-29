import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  // company: DS.belongsTo('company',   {async: true}),
  role: DS.attr('string'),
  uid: DS.attr('string'),
  companyToUserAccess: DS.hasMany('company-to-user',   {async: true}),
});
