import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  email: '',
  password: '',

  model: function () {
    return this.get("session.currentUser.company");
  },
  beforeModel: function() {
    return Ember.RSVP.hash({
      session: this.get("session").fetch().catch(function() {}),
      // intl: this.get('intl').setLocale('en-us'),
      intl: this.get('intl').setLocale('pt-BR'),
    });
    // return this.get("session").fetch().catch(function() {});
  },
  actions: {
    doSignIn: function(email, password) {
      var baseRef = this;
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(function(data) {
        console.log(data.currentUser);
        baseRef.transitionTo('projects');
      });
    },
    signOut: function() {
      this.store.unloadAll();
      this.get("session").close();
    },
    createUser: function(email, password,nome, company) {
      var baseRef = this;
      var ref = new Firebase("https://blazing-inferno-2549.firebaseio.com/");
      ref.createUser({
        email    : email,
        password : password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          baseRef.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: password
          }).then(function(data) {
            console.log(data.currentUser);
            var newUser = baseRef.store.createRecord('user', {
              name: nome,
              role:'admin',
              uid: userData.uid
            });
            newUser.save().then(function (createdUser) {
              baseRef.set('session.currentUser', createdUser);
              var newCompany = baseRef.store.createRecord('company', {
                name: company
              });
              newCompany.save().then(function (createdCompany) {
                createdCompany.get('users').then(function(users) {
                  users.addObject(createdUser);
                  createdCompany.save().then(function() {
                    createdUser.save();
                  });
                });
              });
            });

          });
        }
      });
    }
  }
});
