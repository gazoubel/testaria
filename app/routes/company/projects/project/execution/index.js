import Ember from 'ember';

export default Ember.Route.extend({
  purchaseTransaction: Ember.inject.service('purchase-transaction'),
  model: function (params, transition) {
      return Ember.RSVP.hash({
        newItem: {total:'', description:''},
        project: this.modelFor("company.projects.project"),
        itemTypes: this.store.findAll('item-type'),
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
