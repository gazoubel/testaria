import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    console.log('in model of transaction/edit.js');
    var project = this.modelFor("company.projects.project");
    // project.reload();
    var purchaseTransaction= this.modelFor("company.projects.project.transactions.transaction");
    // purchaseTransaction.reload();
    return Ember.RSVP.hash({
      purchaseTransaction: purchaseTransaction,
      // projects: this.store.findAll('project'),
      project: project,
      itemTypes: this.store.findAll('item-type'),
      providers: this.store.findAll('provider'),
      paymentTypes:  this.store.findAll('payment-type')
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
