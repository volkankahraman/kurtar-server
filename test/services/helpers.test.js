const assert = require('assert');
const app = require('../../src/app');

describe('\'helpers\' service', () => {
  it('registered the service', () => {
    const service = app.service('helpers');

    assert.ok(service, 'Registered the service');
  });
});
