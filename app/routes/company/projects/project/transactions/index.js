import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params, transition) {
      var project = this.modelFor("company.projects.project");
      project.reload();
      // var purchaseTransactions = project.get("uniquePurchaseTransaction").filterBy('isPaid', false);

      var transactionModel = Ember.Object.extend({
        filter: 'unpaid',
        items: project.get("uniquePurchaseTransaction"),
        purchaseTransactions: Ember.computed('items.@each.isPaid', 'items.@each', 'filter', function() {
          var filter = this.get('filter');
          switch(filter) {
              case 'all':
                  return this.get('items');
                  break;
              case 'paid':
                  return this.get('items').filterBy('isPaid', true);
                  break;
              default:
                  return this.get('items').filterBy('isPaid', false);
          }
        }),
        isFilterAll: Ember.computed('filter', function() {
          return this.get('filter') == 'all';
        }),
        isFilterPaid: Ember.computed('filter', function() {
          return this.get('filter') == 'paid';
        }),
        isFilterUnpaid: Ember.computed('filter', function() {
          return this.get('filter') == 'unpaid';
        }),
      });

      var transactionResults = transactionModel.create({
      });

      return Ember.RSVP.hash({
        project: project,
        transactionResults: transactionResults
      });
  }
});
