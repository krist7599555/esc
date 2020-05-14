import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | reservations', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('reservations', {});
    assert.ok(model);
  });
});
