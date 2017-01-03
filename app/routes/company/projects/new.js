import Ember from 'ember';

export default Ember.Route.extend({
  modelIsInValid: false,
  model: function () {
    // var company = this.store.find('company', this.get("session.membership.company.id"));
    return Ember.RSVP.hash({
      // company: company,
      project: this.store.createRecord('project')
    });
  },
  actions: {
      add: function (project){
        var ref = this;
        var controller = this.get('controller');

        controller.set('modelIsInValid', false);
        if (!project.get('validations.isValid')) {
          ref.get('appManager').notify('error', project.get('validations.messages'));
          controller.set('modelIsInValid', true);
          return;
        }

        project.save().then(function() {
            baseRef.get('appManager').notify('success', "project Created");
            ref.transitionTo('company.projects');
        }).catch(function(reason){
          ref.get('appManager').notify('error', project.get('validations.messages'));
        });
      },
      cancel: function (project){
        project.destroyRecord();
        this.transitionTo('company.projects');
      }
    }
});
