import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],

  classNameBindings: ['hasError'],
  hasError: false,

  options: {},
  selected: {},
  displayText: '',
  isDisabled: false,
  isInlineText: false,
  // idInput: '',
  // first: false,
  // last: false,
  size: 5,
  inlineLabelSize: Ember.computed('isInlineText','size', function() {
    return 12-this.get('size');
  }),
  didInitAttrs(){
    this._super(...arguments);
  }

});
