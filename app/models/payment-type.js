import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  fields: DS.attr('string'),
  paymentTypeFields: DS.hasMany('payment-type-field',   {async: true}),
});
