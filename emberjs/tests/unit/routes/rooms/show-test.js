import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | rooms/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:rooms/show');
    assert.ok(route);
  });
});
