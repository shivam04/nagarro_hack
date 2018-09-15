import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | patient_details', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:patient-details');
    assert.ok(route);
  });
});
