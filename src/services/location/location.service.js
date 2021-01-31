// Initializes the `location` service on path `/location`
const { Location } = require('./location.class');
const createModel = require('../../models/location.model');
const hooks = require('./location.hooks');
const cities = require('./../../data/risk_city.json');
const riskMessages = require('./../../data/risk_messages.json');
const localPoints = require('./../../data/local_points.json');

module.exports = function(app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/location', new Location(options, app));

	// Initialize our custom route
	app.get('/risk-cities', (req, res) => {
		let cityRes = {};
		console.log(riskMessages['group1']);
		cities.forEach((group) => {
			if (group[Object.keys(group)[0]].find((city) => city === req.query.city)) {
				cityRes.group = Object.keys(group)[0];
				cityRes.message = riskMessages[cityRes.group];
				cityRes.city = req.query.city;
			}
		});
		// console.log();
		res.json(cityRes);
	});

	app.get('/local-points', (req, res) => {
		res.json(localPoints);
	});

	// Get our initialized service so that we can register hooks
	const service = app.service('location');

	service.hooks(hooks);
};
