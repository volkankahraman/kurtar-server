// Initializes the `helpers` service on path `/helpers`
const { Helpers } = require('./helpers.class');
const createModel = require('../../models/helpers.model');
const hooks = require('./helpers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/helpers', new Helpers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('helpers');

  service.hooks(hooks);
};
