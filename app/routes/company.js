import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  email: '',
  password: '',

  model: function (params) {
    var initalRef = new Firebase("https://testariarouter.firebaseio.com/"+params.company_name).once('value')
      .then(function(snapshot){
        var value = snapshot.val();
        if (value) {
        config.firebase = value.url;
        return snapshot;
        }
      }, function(error){
        return null;
      });
    return initalRef;
  },
  beforeModel: function() {
    return Ember.RSVP.hash({
      session: this.get("session").fetch().catch(function() {}),
      // intl: this.get('intl').setLocale('en-us'),
      intl: this.get('intl').setLocale('pt-BR'),
    });
  },
  actions: {
    doSignIn: function(email, password) {
      var baseRef = this;
      if (config.firebase) {
        baseRef.get('session').open('firebase', {
          provider: 'password',
          email: email,
          password: password
        }).then(function(data) {
          console.log(data.currentUser);
          baseRef.transitionTo('company.projects');
        });
      } else {
        console.log("no url found");
      }
    },
    signOut: function() {
      this.store.unloadAll();
      this.get("session").close();
      // config.firebase = '';
      this.transitionTo('company', this.get('currentModel').name());
    },
  }
});
