import Ember from 'ember';

export default Ember.Component.extend({
  // classNames: ['form-group'],
  //
  // classNameBindings: ['validation.isInvalid:has-error'],

  // classNameBindings: ['col-sm-'+this.get('size')],
  validation:{},
  searchField:"name",
  displayText: '',
  options: {},
  selected: {},
  // size: 5,
  didInitAttrs(){
    this._super(...arguments);
  }
});
