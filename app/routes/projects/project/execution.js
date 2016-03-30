import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      newItem: {total:'', description:''},
      project: this.modelFor("projects.project"),
      selectedProjectStage: null
    });
  },
  actions: {
    add(newItem){
      var expenseItem = this.store.createRecord('expense-item');
      expenseItem.set('total', newItem.total);
      expenseItem.set('description', newItem.description);
      var projectStage = this.get("currentModel.selectedProjectStage");
      projectStage.get('expenseItems').addObject(expenseItem);
      expenseItem.save().then(function() {
        return projectStage.save().then(function(){
          newItem.total='';
          newItem.description='';
        });
      }).catch(function(reason){
        // this.set('mostrarErro', true);
      });
    },
    selectStage(stage){
      this.set('currentModel.selectedProjectStage', stage);
    }
  }
});
