import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('company', {
    path: ':company_name'
  }, function() {
    this.route('administration', function() {
      this.route('units');
      this.route('stages');
      this.route('users');
      this.route('item-types');
      this.route('payment-types', function() {
        this.route('payment-type', {
          path: ':payment_type_id'
        }, function() {
          this.route('edit');
        });
      });
      this.route('provider');
    });
    this.route('projects', function() {
      this.route('new');

      this.route('project', {
        path: ':project_id'
      }, function() {
        this.route('stages', function() {
          this.route('new');

          this.route('stage', {
            path: ':project_stage_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('execution', function() {
          this.route('new');

          this.route('stage', {
            path: ':project_stage_id'
          }, function() {
            this.route('expenses', function() {
              this.route('expense', {
                path: ':expense_id'
              }, function() {
                this.route('edit');
              });
            });
          });
        });
        this.route('transactions', function() {
          this.route('new');

          this.route('transaction', {
            path: ':purchase_transaction_id'
          }, function() {
            this.route('edit');
          });
        });
      });
    });
  });

});

export default Router;
