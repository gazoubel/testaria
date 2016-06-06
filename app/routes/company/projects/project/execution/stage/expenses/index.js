import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params, transition) {
    return Ember.RSVP.hash({
      newItem: {total:'', description:''},
      // project: this.modelFor("projects.project"),
      projectStage: this.modelFor("company.projects.project.execution.stage")
    });
},
actions: {
  add(newItem){
    var baseRef = this;
    var expenseItem = this.store.createRecord('expense-item');
    expenseItem.set('total', newItem.total);
    expenseItem.set('description', newItem.description);
    expenseItem.set('dateAdded', new Date());

    // this.set('currentModel.newItem',{total:'', description:''});
    var projectStage = this.get("currentModel.projectStage");
    projectStage.get('expenseItems').addObject(expenseItem);
    expenseItem.save().then(function() {
      return projectStage.save().then(function(){
        baseRef.set('currentModel.newItem',{total:'', description:''});
      });
    }).catch(function(reason){
      // this.set('mostrarErro', true);
    });
  },
  remove: function (item){
    item.destroyRecord();
  }
}
});
