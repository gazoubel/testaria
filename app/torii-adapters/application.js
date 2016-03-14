import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
export default ToriiFirebaseAdapter.extend({
  firebase: Ember.inject.service(),

  open(authentication) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.store.query('user', {
          orderBy: 'uid',
          startAt: authentication.uid,
          endAt: authentication.uid
      }).then(function(user){
        if (user) {
          resolve({
            provider: authentication.provider,
            uid: authentication.uid,
            currentUser: user.get('firstObject')
          });
        }
      });

      // var store = this.store;
      // var ref = new Firebase("https://testaria-ember.firebaseio.com/users");
      // var queryRef = ref.orderByChild("uid").startAt(authentication.uid).endAt(authentication.uid).limitToFirst(1)
      // queryRef.on("child_added", function(user) {
      //   if (user) {
      //     resolve({
      //       provider: authentication.provider,
      //       uid: authentication.uid,
      //       currentUser: store.find('user', user.key())
      //     });
      //   }
      // });
    });
  }
});
