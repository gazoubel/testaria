import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  email: '',
  password: '',
  notifications: null,

  model: function () {
    // var config = {
    //   apiKey: "AIzaSyD0ERhTCIIjH3vkc0ztpHHPOb74HSG7uww",
    //   authDomain: "azoba-router.firebaseapp.com",
    //   databaseURL: "https://azoba-router.firebaseio.com",
    //   storageBucket: "azoba-router.appspot.com",
    // };
    // var routerApp = firebase.initializeApp(config, "router");
    // var initalRef = routerApp.database().ref("A").once('value')
    //   .then(function(snapshot){
    //     var value = snapshot.val();
    //     if (value) {
    //       config.firebase = value.config;
    //       return value.config;
    //     }
    //   }, function(error){
    //     return null;
    //   });
    // return Ember.RSVP.hash({
    //   routerApp: routerApp,
    //   companyApp: initalRef,
    // });
  },
  beforeModel: function() {
    return Ember.RSVP.hash({
      session: this.get("session").fetch().catch(function() {}),
      intl: this.get('intl').setLocale('pt-BR'),
    });
  },
  actions: {
    createUser: function(email, password,nome, company) {
      var companyAppConfig = this.get("currentModel.companyApp");
      config.firebase = companyAppConfig;
      var companyApp = firebase.initializeApp(companyAppConfig);
      var url = null;
      var baseRef = this;

      var ref = companyApp.database().ref();
      var userCreationPromisse = companyApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error creating user:", errorCode +" / "+errorMessage);
      });
      var userAuthenticated = userCreationPromisse.then(function(userData){
        return baseRef.get('session').open('firebase', {
          provider: 'password',
          email: email,
          password: password
        });
      });
      userAuthenticated.then(function(userData){
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
              var newMembership = baseRef.store.createRecord('company-to-user', {
                user: resolved.user,
                role: "admin"
              });

              newMembership.save().then(function(membership) {
                resolved.user.get('companyToUserAccess').addObject(membership);
                var membershipPromises = Ember.RSVP.hash({
                  user: resolved.user.save(),
                });
              });
            });
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
