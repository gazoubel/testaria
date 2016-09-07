import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  paymentType: DS.belongsTo('payment-type',   {async: true}),
});
