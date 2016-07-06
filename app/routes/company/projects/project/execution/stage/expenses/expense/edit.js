import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor("company.projects.project.execution.stage.expenses.expense");
  },
  actions: {
      save(expenseItem){
        // var controller = this.get('controller');
        // var company = this.get("currentModel");
        // var unit = this.store.createRecord('unit', {
        //   name: name,
        //   acronym: acronym
        // });

        // company.get('units').addObject(unit);
        var baseRef = this;
        expenseItem.save().then(function() {
          baseRef.get('appManager').notify('success', 'Saved successfully!');
          baseRef.transitionTo('company.projects.project.execution.stage.expenses');
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', 'Could not save: '+reason);
        });
      }
    }
});
