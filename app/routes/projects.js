import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    // var company = this.store.find('company', this.get("session.currentUser.company.id"));
    // return this.get("session.membership.company");
    return this.store.findAll('project');
    // var company = this.store.find('company', this.get("session.membership.company.id"));
    // return company;
  },
});
