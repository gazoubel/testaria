import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  model: function () {
    return this.store.findAll('item-type');
  },

  actions: {
      addItemType: function (name){
        var controller = this.get('controller');

        // var company = this.get("currentModel");

        var itemType = this.store.createRecord('item-type', {
          name: name,
        });

        // company.get('stages').addObject(stage);

        itemType.save().then(function() {
          // return company.save().then(function(){
            controller.set('name', '');
          // });
        }).catch(function(reason){
          this.set('mostrarErro', true);
        });
      },
      removeItemType: function (itemType){
        itemType.destroyRecord();
      }
    }
});
