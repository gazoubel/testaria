import Ember from 'ember';

export default Ember.Route.extend({
  purchaseTransaction: Ember.inject.service('purchase-transaction'),
  model: function (params, transition) {
      var project = this.modelFor("company.projects.project");
      // var purchaseTransactions = project.get("purchaseTransactions");
      //.filterBy('projectStageAssigned', false);
      var expenseItems = project.get("expenseItems").filterBy('projectStageAssigned', false);

      return Ember.RSVP.hash({
        newItem: {total:'', description:''},
        project: project,
        itemTypes: this.store.findAll('item-type'),
        // purchaseTransactions: purchaseTransactions,
        expenseItems: expenseItems
      });
  },
  actions: {
    add(newItem){
      var baseRef = this;
      var project = this.get("currentModel.project");
      var promisse = this.get('purchaseTransaction').quickAdd(newItem, project).then(function(){
        baseRef.set('currentModel.newItem',{total:'', description:''});
        baseRef.get('appManager').notify('success', 'Saved successfully!');
      });
      promisse.catch(function() {
        console.log("could not create");
        baseRef.get('appManager').notify('error', 'Could not create!');
      });
    }
  }
});
