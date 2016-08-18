import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  init() {
    this._super(...arguments);
  },
  addNewItem(newItem, purchaseTransaction){
    var expenseItem = this.get('store').createRecord('expense-item');
    // var project = newItem.project;
    // expenseItem.set('total', newItem.total);
    // expenseItem.set('description', newItem.description);
    // expenseItem.set('itemType', newItem.itemType);
    // expenseItem.set('dateAdded', new Date());
    // expenseItem.set('purchaseTransaction', purchaseTransaction);
    // purchaseTransaction.get('expenseItems').addObject(expenseItem);
    // project.get('expenseItems').addObject(expenseItem);
    // newItem.itemType.get('expenseItems').addObject(expenseItem);
    var promise = new Promise(function(resolve, reject) {
      expenseItem.set('total', newItem.total),
      expenseItem.set('description', newItem.description),
      expenseItem.set('itemType', newItem.itemType),
      expenseItem.set('dateAdded', new Date()),
      expenseItem.set('purchaseTransaction', purchaseTransaction),
      purchaseTransaction.get('expenseItems').addObject(expenseItem),
      newItem.project.get('expenseItems').addObject(expenseItem),
      newItem.itemType.get('expenseItems').addObject(expenseItem)
      resolve(newItem);

      // on failure
      // reject(reason);
    });
    return promise;
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
    project.get('purchaseTransactions').addObject(purchaseTransaction);
    expenseItem.set('project', project);
    project.get('expenseItems').addObject(expenseItem);
    if (projectStage) {
      expenseItem.set('projectStage', projectStage);
      // purchaseTransaction.set('projectStage', projectStage);
      projectStage.get('expenseItems').addObject(expenseItem);
      // projectStage.get('purchaseTransactions').addObject(purchaseTransaction);

    }
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
  rollback(purchaseTransaction){
    var promise = new Promise(function(resolve, reject) {
      purchaseTransaction.get('expenseItems').forEach(function(item) {
        item.get('project').then(function(project){
          project.rollbackAttributes();
        });
        item.get('projectStage').then(function(projectStage){
          projectStage.rollbackAttributes();
        });
        item.rollbackAttributes();
      });
      purchaseTransaction.rollbackAttributes();
      resolve(newItem);
      // on failure
      // reject(reason);
    });
    return promise;
  }
});
