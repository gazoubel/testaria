import Ember from 'ember';
import config from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  // session: Ember.inject.service(),
  firebase: new Firebase(config.firebase)
  // ,
  // pathForType: function(type) {
  //   //get the firebase authentication data via the `Firebase` instance
  //   //that i have injected into my app via an initializer
  //   var session = this.container.lookup('service:session');
  //   if (session.get('isWorking')) {
  //     return  Ember.String.pluralize(type);
  //
  //   }
  //   return  Ember.String.pluralize(type) + '/' + session.get('currentUser.company.id');
  // }
});
