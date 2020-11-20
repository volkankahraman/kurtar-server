const assert = require('assert');
const app = require('../../src/app');

describe('\'userSettings\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-settings');

    assert.ok(service, 'Registered the service');
  });
});
