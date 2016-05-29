import Ember from 'ember';

export default Ember.Route.extend({
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
        // var company = this.get("currentModel.company");
        // company.get('projects').addObject(project);

        project.save().then(function() {
          // return company.save().then(function(){
            ref.transitionTo('projects');
          // });
        }).catch(function(reason){
          // this.set('mostrarErro', true);
        });
      }
    }
});
