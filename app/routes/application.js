import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  email: '',
  password: '',
  notifications: null,

  model: function () {
    // this.notifications.setDefaultClearNotification(1200);
    // return this.get("session.currentUser.company");
    return this.get("session.membership.company");
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
      var initalRef = new Firebase("https://testariarouter.firebaseio.com/A/url");
      var url = null;
      var baseRef = this;
      initalRef.on("value", function(snapshot) {
        console.log(snapshot.val());
        url = snapshot.val();
        if (url) {
          config.firebase = url;
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
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },
    signOut: function() {
      this.store.unloadAll();
      this.get("session").close();
    },
    createUser: function(email, password,nome, company) {
      var initalRef = new Firebase("https://testariarouter.firebaseio.com/A/url");
      var url = null;
      var baseRef = this;
      initalRef.on("value", function(snapshot) {
        url = snapshot.val();
        if (url) {
          config.firebase = url;
          var ref = new Firebase(url);
          ref.createUser({
            email    : email,
            password : password
          }, function(error, userData) {
            if (error) {
              console.log("Error creating user:", error);
            } else {
              console.log("Successfully created user account with uid:", userData.uid);
                var newUser = baseRef.store.createRecord('user', {
                  name: nome,
                  email: email,
                  uid: userData.uid
                });
                var newCompany = baseRef.store.createRecord('company', {
                  name: company
                });
                var promises = Ember.RSVP.hash({
                  user: newUser.save(),
                  // company: newCompany.save()
                });
                promises.catch(function() {
                  console.log("could not create", userData.uid);
                });
                promises.then(function (resolved) {
                  // baseRef.set('session.currentUser', resolved.user);
                  var newMembership = baseRef.store.createRecord('company-to-user', {
                    user: resolved.user,
                    // company: resolved.company,
                    role: "admin"
                  });

                  newMembership.save().then(function(membership) {
                    resolved.user.get('companyToUserAccess').addObject(membership);
                    // resolved.company.get('companyToUserAccess').addObject(membership);
                    var membershipPromises = Ember.RSVP.hash({
                      user: resolved.user.save(),
                      // company: resolved.company.save()
                    });
                  });
                });
            }
          });
        } else {
          console.log("no url found");
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });



    }
    // createUser: function(email, password,nome, company) {
    //   var baseRef = this;
    //   var ref = new Firebase("https://blazing-inferno-2549.firebaseio.com/");
    //   ref.createUser({
    //     email    : email,
    //     password : password
    //   }, function(error, userData) {
    //     if (error) {
    //       console.log("Error creating user:", error);
    //     } else {
    //       console.log("Successfully created user account with uid:", userData.uid);
    //       baseRef.get('session').open('firebase', {
    //         provider: 'password',
    //         email: email,
    //         password: password
    //       }).then(function(data) {
    //         console.log(data.currentUser);
    //         var newUser = baseRef.store.createRecord('user', {
    //           name: nome,
    //           role:'admin',
    //           uid: userData.uid
    //         });
    //         newUser.save().then(function (createdUser) {
    //           baseRef.set('session.currentUser', createdUser);
    //           var newCompany = baseRef.store.createRecord('company', {
    //             name: company
    //           });
    //           newCompany.save().then(function (createdCompany) {
    //             createdCompany.get('users').then(function(users) {
    //               users.addObject(createdUser);
    //               createdCompany.save().then(function() {
    //                 createdUser.save();
    //               });
    //             });
    //           });
    //         });
    //
    //       });
    //     }
    //   });
    // }
  }
});
