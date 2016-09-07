import Ember from 'ember';


export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      project: this.modelFor("company.projects.project"),
      purchaseTransaction: this.store.createRecord('purchase-transaction'),
      // projects: this.store.findAll('project'),
      itemTypes: this.store.findAll('item-type')
      // stages: this.store.findAll('stage')
    });
  },
  actions: {
      save(projectStage){
        this.transitionTo('company.projects.project.transactions');
      },
      cancel(purchaseTransaction){
        this.transitionTo('company.projects.project.transactions');
        // this.get('store').rollback().then(function(){
        //   this.transitionTo('company.projects.project.transactions');
        // });
      }
    }
});
