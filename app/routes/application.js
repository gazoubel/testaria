import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({

  email: '',
  password: '',

  model: function () {
    return this.store.findAll('announcement');
  },
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  actions: {
    doSignIn: function(email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(function(data) {
        console.log(data.currentUser);
      });
    },
    signOut: function() {
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
