import Ember from 'ember';
import generateUuid from '../helpers/generate-uuid';

export default Ember.Component.extend({

  // classNames: ['form-group'],
  //
  // classNameBindings: ['hasError'],
  // hasError: false,

  validation:{},
  field: null,
  displayText: '',
  isDisabled: false,
  isInlineText: false,
  idInput: '',
  // first: false,
  // last: false,
  // size: 5,
  format: 'dd/mm/yyyy',

  // inlineLabelSize: Ember.computed('isInlineText','size', function() {
  //   return 12-this.get('size');
  // }),

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'mab' + generateUuid.compute() : idInput;
  }),

  // cssClassFirst: Ember.computed('first', function() {
  //   return (this.get('first')) ? 'first' : '';
  // }),
  //
  // cssClassLast: Ember.computed('last', function () {
  //   return (this.get('last')) ? 'last' : '';
  // }),

  keyDown: function(event) {
    var newEvent;
    if (event.keyCode === 32) {
      newEvent = $.Event('keydown');
      newEvent.keyCode = 27;
      this.$('input').trigger(newEvent);
      event.preventDefault();
      event.stopPropagation();
    }
  },

  keyUp: function(event) {
    var newEvent;
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      newEvent = $.Event('keydown');
      newEvent.keyCode = 27;
      $(event.target).trigger(newEvent);
      this.sendAction('cancel');
    }
  }

});
