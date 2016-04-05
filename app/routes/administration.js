import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var company = this.store.find('company', this.get("session.currentUser.company.id"));
    return company;
  },
});