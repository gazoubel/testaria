import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  init() {
    this._super(...arguments);
  },
  quickAdd(newItem, project, projectStage) {
    var expenseItem = this.get('store').createRecord('expense-item');
    var purchaseTransaction = this.get('store').createRecord('purchase-transaction');
    expenseItem.set('total', newItem.total);
    expenseItem.set('description', newItem.description);
    expenseItem.set('itemType', newItem.itemType);
    expenseItem.set('dateAdded', new Date());
    expenseItem.set('purchaseTransaction', purchaseTransaction);
    purchaseTransaction.set('expenseItems', [expenseItem]);

    purchaseTransaction.set('project', project);
    if (projectStage) {
      purchaseTransaction.set('projectStage', projectStage);
      projectStage.get('purchaseTransactions').addObject(purchaseTransaction);

    }
    project.get('purchaseTransactions').addObject(purchaseTransaction);
    newItem.itemType.get('expenseItems').addObject(expenseItem);
    return expenseItem.save().then(function() {
      if (projectStage) {
        var promisses = Ember.RSVP.hash({
          project: project.save(),
          purchaseTransaction: purchaseTransaction.save(),
          itemType: newItem.itemType.save(),
          projectStage: projectStage.save()
        });
        return promisses;
      } else {
        var promisses = Ember.RSVP.hash({
          project: project.save(),
          purchaseTransaction: purchaseTransaction.save(),
          itemType: newItem.itemType.save()
        });
        return promisses;
      }
    }).catch(function(reason){
      // this.set('mostrarErro', true);
    });
  },
});
