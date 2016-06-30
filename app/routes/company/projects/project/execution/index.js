import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params, transition) {
      return Ember.RSVP.hash({
        newItem: {total:'', description:''},
        // project: this.modelFor("projects.project"),
        project: this.modelFor("company.projects.project"),
        itemTypes: this.store.findAll('item-type'),
        // selectedItemType: {}
      });
  },
  actions: {
    add(newItem){
      var baseRef = this;
      var expenseItem = this.store.createRecord('expense-item');
      var purchaseTransaction = this.store.createRecord('purchase-transaction');
      expenseItem.set('total', newItem.total);
      expenseItem.set('description', newItem.description);
      expenseItem.set('itemType', newItem.itemType);
      expenseItem.set('dateAdded', new Date());
      expenseItem.set('purchaseTransaction', purchaseTransaction);
      purchaseTransaction.set('expenseItems', [expenseItem]);

      var project = this.get("currentModel.project");
      purchaseTransaction.set('project', project);
      project.get('purchaseTransactions').addObject(purchaseTransaction);
      newItem.itemType.get('expenseItems').addObject(expenseItem);
      expenseItem.save().then(function() {
        var promisses = Ember.RSVP.hash({
          project: project.save(),
          purchaseTransaction: purchaseTransaction.save(),
          itemType: newItem.itemType.save()
        });
        promisses.catch(function() {
          console.log("could not create", userData.uid);
        });

        return promisses.then(function(){
          baseRef.set('currentModel.newItem',{total:'', description:''});
        });
      }).catch(function(reason){
        // this.set('mostrarErro', true);
      });
    }
  }
});
