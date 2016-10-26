import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  projects: null,
  purchaseTransactionService: Ember.inject.service('purchase-transaction'),
  store: Ember.inject.service('store'),
  purchaseTransaction: {},
  newItem: {total:'', description:''},
  itemTypes: {},
  providers: {},
  itemsRemoved: [],
  paymentTypes: null,
  // itemSelection: null,
  paymentDataFields: {},
  payment: {},
  init() {
    this._super(...arguments);
    this.newItem = {total:'', description:''};
    this.itemsRemoved= [];
    if (this.project) {
      this.newItem.project=this.project;
      this.projects = null;
      this.purchaseTransaction.set('project', this.project);
    }
    var paymentType = this.purchaseTransaction.get('paymentType');
    if (paymentType.get('id')) {
      var paymentInfo = this.purchaseTransaction.get('paymentInfo');
      var pData = paymentType.get('paymentTypeFields').map(function(field){
        return Ember.Object.create({
          field: field,
          value: paymentInfo?paymentInfo[field.get('name')]:null
        });
      });
      this.paymentDataFields = pData;
    }
  },
  actions: {
    paymentTypeSelectionChange(paymentType) {
      var self = this;
      // this.set('itemSelection',paymentType);

      var paymentInfo = this.get('purchaseTransaction.paymentInfo');
      var pData = paymentType.get('paymentTypeFields').map(function(field){
        return Ember.Object.create({
          field: field,
          // value: paymentInfo?paymentInfo[field.get('name')]:null
          value: null
        });
      });
      self.set('purchaseTransaction.paymentType',paymentType);
      self.set('paymentDataFields',pData);
    },
    save(purchaseTransaction){
      var ref = this;
      var promises = new Array();

      var paymentType = ref.get('purchaseTransaction.paymentType');
      if (paymentType.get('id')) {
        var payment = {};
        ref.get('paymentDataFields').forEach(function(paymentDataField) {
          payment[paymentDataField.get('field.name')] = paymentDataField.value?paymentDataField.value:'';
        });
        // var paymentInfo = { paymentType: this.get('itemSelection'), values:payment};
        // purchaseTransaction.set('paymentInfo.payymentType', this.get('itemSelection'));
        purchaseTransaction.set('paymentInfo', payment);
      }

      // if (provider) {
      //   provider.get('purchaseTransactions').addObject(purchaseTransaction);
      // }
      purchaseTransaction.save().then(function(purchaseTransaction) {
          var providerPromisse = purchaseTransaction.get('provider').then(function(provider){
            if (provider) {
              provider.get('purchaseTransactions').addObject(purchaseTransaction);
            }
            return provider.save();
          });
          promises.push(providerPromisse);
          purchaseTransaction.get('expenseItems').forEach(function(item) {
            promises.push(item.save());
            item.get('project').then(function(project){
              promises.push(project.save());
            });
            item.get('itemType').then(function(itemType){
              promises.push(itemType.save());
            });

            item.get('projectStage').then(function(projectStage){
              if (projectStage)
                promises.push(projectStage.save());
            });
          });
          ref.get('itemsRemoved').forEach(function(item) {
            item.destroyRecord();
          });
      }, function(error) {
        ref.get('appManager').notify('error', 'Could not save!');
      });
      Ember.RSVP.all(promises).then(function() {
        ref.sendAction('onSave', purchaseTransaction);
      }, function(error) {
        baseRef.get('appManager').notify('error', 'Could not save!');
      });
    },
    cancel(purchaseTransaction){
      var ref = this;
      this.get('purchaseTransactionService').rollback(purchaseTransaction, this.itemsRemoved).then(function(){
        purchaseTransaction.get('expenseItems').forEach(function(item) {
          item.get('project').then(function(project){
            project.reload();
          });
          item.get('projectStage').then(function(projectStage){
            projectStage.reload();
          });
          item.reload();
        });
        purchaseTransaction.reload();
      });
      ref.set('newItem',{total:'', description:'', itemType:{}, project: {}});
      ref.sendAction('onCancel', purchaseTransaction);
    },
    addNewItem(newItem, purchaseTransaction){
      var baseRef = this;
      var promisse = this.get('purchaseTransactionService').addNewItem(newItem, purchaseTransaction).then(function(){
        var emptyNewItem = {total:'', description:'', project: newItem.project};
        baseRef.set('newItem', emptyNewItem);
        baseRef.get('appManager').notify('success', 'Saved successfully!');
      });
      promisse.catch(function() {
        console.log("could not create");
        baseRef.get('appManager').notify('error', 'Could not create!');
      });
    },
    removeItem(item, purchaseTransaction){
      this.itemsRemoved.addObject(item);
      purchaseTransaction.get('expenseItems').removeObject(item);
      item.get('project').then(function(project){
        project.get('expenseItems').removeObject(item);
      });
      item.get('projectStage').then(function(projectStage){
        projectStage.get('expenseItems').removeObject(item);
      });
    }
  }
});
