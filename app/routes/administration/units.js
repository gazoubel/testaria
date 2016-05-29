import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  acronym: '',
  model: function () {
    return this.store.findAll('unit');
  },

  actions: {
      addUnit: function (name, acronym){
        var controller = this.get('controller');

        // var company = this.get("currentModel");

        var unit = this.store.createRecord('unit', {
          name: name,
          acronym: acronym
        });

        // company.get('units').addObject(unit);

        unit.save().then(function() {
          // return company.save().then(function(){
            controller.set('name', '');
            controller.set('acronym', '');
          // });
        }).catch(function(reason){
          this.set('mostrarErro', true);
        });
      },
      removeUnit: function (unit){
        unit.destroyRecord();
      }
    }
});
