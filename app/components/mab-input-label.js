import Ember from 'ember';
import generateUuid from '../helpers/generate-uuid';

export default Ember.Component.extend({

  classNames: ['form-group'],

  field: null,
  displayText: '',
  isDisabled: false,
  isMultiline: false,
  isInlineText: false,
  isUppercase: false,
  idInput: '',
  maxlength: 524288,
  first: false,
  last: false,
  size: 5,

  onChange: function() {},

  inlineLabelSize: Ember.computed('isInlineText','size', function() {
    return 12-this.get('size');
  }),

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'mab' + generateUuid.compute() : idInput;
  }),

  cssClass: Ember.computed('isUppercase', function() {
    return Ember.String.htmlSafe('form-control mousetrap' + (this.get('isUppercase') ? ' uppercase' : ''));
  }),

  cssClassFirst: Ember.computed('first', function() {
    return (this.get('first')) ? 'first' : '';
  }),

  cssClassLast: Ember.computed('last', function () {
    return (this.get('last')) ? 'last' : '';
  }),

  actions: {
    onChange: function() {
      this.get('onChange')();
    }
  }

});
