import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | health_records/city_count', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:health-records/city-count');
    assert.ok(route);
  });
});
