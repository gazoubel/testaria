import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],

  classNameBindings: ['validation.isInvalid:has-error'],
  validation:{},
  searchField:"name",
  displayText: '',
  options: {},
  selected: {},
  size: 5,
  didInitAttrs(){
    this._super(...arguments);
  }
});
