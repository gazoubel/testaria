import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('az-input-date-label', 'Integration | Component | az input date label', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{az-input-date-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#az-input-date-label}}
      template block text
    {{/az-input-date-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
