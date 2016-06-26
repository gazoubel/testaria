import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  email: '',
  password: '',

  model: function (params) {
    var routerFirebaseConfig = {
      apiKey: "AIzaSyD0ERhTCIIjH3vkc0ztpHHPOb74HSG7uww",
      authDomain: "azoba-router.firebaseapp.com",
      databaseURL: "https://azoba-router.firebaseio.com",
      storageBucket: "azoba-router.appspot.com",
    };
    var routerApp = firebase.initializeApp(routerFirebaseConfig, "router");
    var initalRef = routerApp.database().ref(params.company_name).once('value')
      .then(function(snapshot){
        var value = snapshot.val();
        if (value) {
          config.firebase = value.config;
          value.id = snapshot.key;
          return value;
          // return value;
        }
      }, function(error){
        return null;
      });
    // return initalRef;
    return Ember.RSVP.hash({
      baseInfo: initalRef,
      // routerApp: routerApp,
      // intl: this.get('intl').setLocale('en-us'),
      // companyApp: initalRef,
    });
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
      // var companyAppConfig = this.get("currentModel.companyApp");
      // config.firebase = companyAppConfig;

      if (config.firebase) {
        baseRef.get('session').open('firebase', {
          provider: 'password',
          email: email,
          password: password
        }).then(function(data) {
          console.log(data.currentUser);
          // baseRef.transitionTo('company.projects');
        });
      } else {
        console.log("no url found");
      }
    },
    signOut: function() {
      var companyName = this.get('currentModel.baseInfo').id;
      this.store.unloadAll();
      this.get("session").close();
      // config.firebase = '';
      this.transitionTo('company', companyName);
    },
  }
});
