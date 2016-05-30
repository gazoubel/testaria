import EmberPowerSelect from 'ember-power-select/components/power-select';

export default EmberPowerSelect.extend({
  searchEnabled: true,
  allowClear: false,
  intl: Ember.inject.service(),
  placeholder: Ember.computed(function() {
    return this.get('intl').t('product.basic.commonWords.select');
  })
});
