import Ember from 'ember';

export default Ember.Route.extend({
  name: '',
  email: '',
  model: function () {
    return this.store.findAll('company-to-user');
  },

  actions: {
      addUser: function (name, email){
        var baseRef = this;
        var ref = new Firebase("https://blazing-inferno-2549.firebaseio.com/");
        // var company = model;
        ref.createUser({
          email    : email,
          password : 'changeme!'
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
            baseRef.get('appManager').notify('error', "Error creating user:" + error.message);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
              var newUser = baseRef.store.createRecord('user', {
                name: name,
                email: email,
                uid: userData.uid
              });
              var promises = Ember.RSVP.hash({
                user: newUser.save()
              });
              promises.catch(function() {
                console.log("could not create", userData.uid);
                baseRef.get('appManager').notify('error', 'Could not create new user');
              });
              promises.then(function (resolved) {
                var newMembership = baseRef.store.createRecord('company-to-user', {
                  user: resolved.user,
                  // company: company,
                  role: "admin"
                });

                newMembership.save().then(function(membership) {
                  resolved.user.get('companyToUserAccess').addObject(membership);
                  // company.get('companyToUserAccess').addObject(membership);
                  var membershipPromises = Ember.RSVP.hash({
                    user: resolved.user.save(),
                    // company: company.save()
                  });

                  membershipPromises.catch(function() {
                    console.log("could not create", userData.uid);
                    baseRef.get('appManager').notify('error', 'Could not create new user membership');
                  });

                  membershipPromises.then(function(){
                    baseRef.get('appManager').notify('success', 'Saved successfully!');
                  })
                });
              });
          }
        });
      },
      removeuser: function (user){
        user.destroyRecord();
      }
    }
});
