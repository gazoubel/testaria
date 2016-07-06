import Ember from 'ember';

export default Ember.Service.extend({
  notifications: null,

  notify: function(notificationType, message) {
    switch (notificationType) {
      case 'info':
        this.notifications.info(message, {
          autoClear: true
        });
        break;
      case 'error':
        this.notifications.error(message, {
          autoClear: true
        });
        break;
      case 'success':
        this.notifications.success(message, {
          autoClear: true
        });
        break;
      case 'warning':
        this.notifications.warning(message, {
          autoClear: true
        });
        break;
    }
  }
});
