import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params, transition) {
      return Ember.RSVP.hash({
        newItem: {total:'', description:''},
        // project: this.modelFor("projects.project"),
        project: this.modelFor("company.projects.project"),
        itemTypes: this.store.findAll('item-type'),
        // selectedItemType: {}
      });
  },
  actions: {
    add(newItem){
      var baseRef = this;
      var expenseItem = this.store.createRecord('expense-item');
      expenseItem.set('total', newItem.total);
      expenseItem.set('description', newItem.description);
      expenseItem.set('itemType', newItem.itemType);
      expenseItem.set('dateAdded', new Date());

      // this.set('currentModel.newItem',{total:'', description:''});
      var project = this.get("currentModel.project");
      expenseItem.set('project', project);
      project.get('expenseItems').addObject(expenseItem);
      newItem.itemType.get('expenseItems').addObject(expenseItem);
      expenseItem.save().then(function() {
        var promisses = Ember.RSVP.hash({
          project: project.save(),
          itemType: newItem.itemType.save()
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
    }
  }
});
