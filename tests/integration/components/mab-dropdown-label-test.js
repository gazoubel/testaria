import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mab-dropdown-label', 'Integration | Component | mab dropdown label', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{mab-dropdown-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#mab-dropdown-label}}
      template block text
    {{/mab-dropdown-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
