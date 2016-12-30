import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    remove: function (projectStage){
      projectStage.destroyRecord();
    }
  }
});
