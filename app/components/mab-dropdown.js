import EmberPowerSelect from 'ember-power-select/components/power-select';

export default EmberPowerSelect.extend({
  searchEnabled: true,
  allowClear: true,
  intl: Ember.inject.service(),
  placeholder: Ember.computed(function() {
    return this.get('intl').t('product.basic.commonWords.select');
  })
  // intl: Ember.inject.service(),
  // placeholder: Ember.computed('intl.locale', function() {
  //   return this.get('intl').t('product.basic.commonWords.select');
  // })
  // placeholder: this.get('intl').formatMessage('product.basic.commonWords.select')
});
