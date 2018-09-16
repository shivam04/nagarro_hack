import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | health_records', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:health-records');
    assert.ok(route);
  });
});
