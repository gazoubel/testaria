import Ember from 'ember';
import config from '../config/environment';

export default Ember.Helper.extend({
  intl: Ember.inject.service(),
  compute(params, hash) {
    let value = params[0];
    return this.get('intl').formatNumber(value, {
      style:'currency',
      currency:config.APP.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
});
