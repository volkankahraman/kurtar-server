// Initializes the `userSettings` service on path `/user-settings`
const { UserSettings } = require('./user-settings.class');
const createModel = require('../../models/user-settings.model');
const hooks = require('./user-settings.hooks');

module.exports = function(app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/user-settings', new UserSettings(options, app));

	// Initialize our custom route
	app.get('/risk-sities', (req, res) => {
		res.send('Hello from custom route');
	});

	// Get our initialized service so that we can register hooks
	const service = app.service('user-settings');

	service.hooks(hooks);
};
