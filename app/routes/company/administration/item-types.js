import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  modelIsInValid: false,
  model: function () {
    return this.store.findAll('item-type');
  },

  actions: {
      addItemType: function (name){
        var baseRef = this;
        var controller = this.get('controller');

        var itemType = this.store.createRecord('item-type', {
          name: name,
        });

        controller.set('modelIsInValid', false);
        if (!itemType.get('validations.isValid')) {
          baseRef.get('appManager').notify('error', itemType.get('validations.messages'));
          controller.set('modelIsInValid', true);
          itemType.rollbackAttributes();
          return;
        }

        itemType.save().then(function() {
          baseRef.get('appManager').notify('success', "itemType Created");
          controller.set('name', '');
        }).catch(function(reason){
          baseRef.get('appManager').notify('error', "Error creating itemType:" + reason);
        });
      },
      removeItemType: function (itemType){
        itemType.destroyRecord();
      }
    }
});
