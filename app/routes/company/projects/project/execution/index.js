import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params, transition) {
      return Ember.RSVP.hash({
        // newItem: {total:'', description:''},
        // project: this.modelFor("projects.project"),
        project: this.modelFor("company.projects.project")
      });
  },
  // actions: {
  //   add(newItem){
  //     var baseRef = this;
  //     var expenseItem = this.store.createRecord('expense-item');
  //     expenseItem.set('total', newItem.total);
  //     expenseItem.set('description', newItem.description);
  //     // this.set('currentModel.newItem',{total:'', description:''});
  //     var project = this.get("currentModel");
  //     projectprojecttage.get('expenseItems').addObject(expenseItem);
  //     expenseItem.save().then(function() {
  //       return project.save().then(function(){
  //         baseRef.set('currentModel.newItem',{total:'', description:''});
  //       });
  //     }).catch(function(reason){
  //       // this.set('mostrarErro', true);
  //     });
  //   },
  //   remove: function (item){
  //     item.destroyRecord();
  //   }
  // }
});
