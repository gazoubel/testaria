import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  model: function () {
    return this.store.findAll('stage');
  },

  actions: {
      addStage: function (name, acronym){
        var controller = this.get('controller');

        // var company = this.get("currentModel");

        var stage = this.store.createRecord('stage', {
          name: name,
        });

        // company.get('stages').addObject(stage);

        stage.save().then(function() {
          // return company.save().then(function(){
            controller.set('name', '');
          // });
        }).catch(function(reason){
          this.set('mostrarErro', true);
        });
      },
      removeStage: function (stage){
        stage.destroyRecord();
      }
    }
});
