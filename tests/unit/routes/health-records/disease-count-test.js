import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | health_records/disease_count', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:health-records/disease-count');
    assert.ok(route);
  });
});
