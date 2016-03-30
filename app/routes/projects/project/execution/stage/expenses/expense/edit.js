import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor("projects.project.execution.stage.expenses.expense");
  }
});
