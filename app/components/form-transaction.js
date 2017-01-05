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
  selectedOtherProjectStage:null,
  init() {
    this._super(...arguments);
    this.newItem = {total:'', description:''};
    this.itemsRemoved= [];
    this.selectedOtherProjectStage = this.purchaseTransaction.get('otherProjectStage');
    if (this.project) {
      this.newItem.project=this.project;
      this.projects = null;
      this.purchaseTransaction.set('project', this.project);
    }
    var self = this;
    self.purchaseTransaction.get('paymentType').then(function(paymentType){
      if (paymentType) {
        var paymentInfo=self.purchaseTransaction.get('paymentInfo');
        paymentType.get('paymentTypeFields').then(function (paymentTypeFields) {
          var pData = paymentTypeFields.map(function(field){
            return Ember.Object.create({
              field: field,
              value: paymentInfo?paymentInfo[field.get('name')]:null
            });
          });
          console.log('in form-transaction inits paymenttype data'+pData );
          self.set('paymentDataFields',pData);
        })
      }
    });
  },
  actions: {
    paymentTypeSelectionChange(paymentType) {
      var self = this;

      var paymentInfo = this.get('purchaseTransaction.paymentInfo');
      var pData = paymentType.get('paymentTypeFields').map(function(field){
        return Ember.Object.create({
          field: field,
          value: null
        });
      });
      self.set('purchaseTransaction.paymentType',paymentType);
      self.set('paymentDataFields',pData);
    },
    // otherProjectStageChanged(otherProjectStage){
    //   var self = this;
    //
    // },
    save(purchaseTransaction){
      var ref = this;

      if (!purchaseTransaction.get('validations.isValid')) {
        ref.get('appManager').notify('error', purchaseTransaction.get('validations.messages'));
        return;
      }

      var promises = new Array();
      var paymentType = ref.get('purchaseTransaction.paymentType');
      if (paymentType.get('id')) {
        var payment = {};
        ref.get('paymentDataFields').forEach(function(paymentDataField) {
          payment[paymentDataField.get('field.name')] = paymentDataField.value?paymentDataField.value:'';
        });
        purchaseTransaction.set('paymentInfo', payment);
      } else {
        purchaseTransaction.set('paymentInfo', null);
      }

      purchaseTransaction.save().then(function(purchaseTransaction) {
          var providerPromisse = purchaseTransaction.get('provider').then(function(provider){
            if (provider) {
              provider.get('purchaseTransactions').addObject(purchaseTransaction);
            }
            return provider.save();
          });
          // other project stage
          if (ref.get('selectedOtherProjectStage.id') != purchaseTransaction.get('otherProjectStage.id')) {
            //delete old reference
            var otherProjectStageDeletePromisse = purchaseTransaction.get('otherProjectStage').then(function(previousOtherProjectStage){
              if (previousOtherProjectStage) {
                previousOtherProjectStage.get('otherPurchaseTransactions').then(function(otherPurchaseTransactions){
                  otherPurchaseTransactions.removeObject(purchaseTransaction);
                })
                return previousOtherProjectStage.save();
              }
            });
            if(otherProjectStageDeletePromisse)
              promises.push(otherProjectStageDeletePromisse);

            // add new reference
            let otherProjectStage = ref.get('selectedOtherProjectStage');
            purchaseTransaction.set('otherProjectStage', otherProjectStage);
            promises.push(purchaseTransaction.save());
            otherProjectStage.get('otherPurchaseTransactions').then(function(otherPurchaseTransactions){
              otherPurchaseTransactions.addObject(purchaseTransaction);
            })

            promises.push(otherProjectStage.save());
          }

          promises.push(providerPromisse);
          purchaseTransaction.get('expenseItems').forEach(function(item) {
            promises.push(item.save());
            item.get('project').then(function(project){
              promises.push(project.save());
            });
            item.get('itemType').then(function(itemType){
              if(itemType)
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
        baseRef.get('appManager').notify('error', 'Could not save!'+error);
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
