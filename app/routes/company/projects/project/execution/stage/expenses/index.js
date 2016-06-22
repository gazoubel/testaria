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
    var project = projectStage.get("project");
    expenseItem.set('project', projectStage.get('project'));
    projectStage.get('expenseItems').addObject(expenseItem);
    project.get('expenseItems').addObject(expenseItem);
    expenseItem.save().then(function() {
      var promisses = Ember.RSVP.hash({
        projectStage: projectStage.save(),
        project: project.save()
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
  },
  remove: function (item){
    item.destroyRecord();
  }
}
});
