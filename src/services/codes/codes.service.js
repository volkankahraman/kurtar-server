// Initializes the `codes` service on path `/codes`
const { Codes } = require('./codes.class');
const createModel = require('../../models/codes.model');
const hooks = require('./codes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/codes', new Codes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('codes');

  service.hooks(hooks);
};
