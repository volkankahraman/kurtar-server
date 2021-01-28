const users = require('./users/users.service.js');
const location = require('./location/location.service.js');
const helpers = require('./helpers/helpers.service.js');
const userSettings = require('./user-settings/user-settings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
	app.configure(users);
	app.configure(location);
	app.configure(helpers);
	app.configure(userSettings);
};
