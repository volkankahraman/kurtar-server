const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const populate = require('feathers-populate-hook');

const getWithLocationData = (context) => {};

module.exports = {
	before: {
		all: [ populate.compatibility() ],
		find: [ authenticate('jwt') ],
		get: [ authenticate('jwt'), getWithLocationData ],
		create: [
			async (context) => {
				let userSettings = await context.app.service('user-settings').create({});

				context.data.userSettings = userSettings._id;

				return context;
			},
			hashPassword('password')
		],
		update: [ hashPassword('password'), authenticate('jwt') ],
		patch: [ hashPassword('password'), authenticate('jwt') ],
		remove: [ authenticate('jwt') ]
	},

	after: {
		all: [
			// Make sure the password field is never sent to the client
			// Always must be the last hook
			protect('password')
		],
		find: [],
		get: [
			populate(
				{
					lastKnownLocation: {
						service: 'location', // Foreign service
						f_key: 'id', // Foreign key
						one: true, // Optional, if only one resolve object is wanted
						query: {
							$select: [ 'latitude', 'longitude' ]
						}
					},
					userSettings: {
						service: 'user-settings',
						f_key: 'id', // Foreign key
						one: true,
						query: {
							// defaults to {} but you can specify any other options here
							$select: [ 'notification', 'theme', 'language' ]
						}
					},
					helpers: {
						service: 'helpers',
						f_key: 'id', // Foreign key
						l_key: 'citizen',
						query: {
							$select: [ 'fullName', 'email', 'telNo' ]
						}
					}
					// helpers: { service: 'helpers', f_key: 'id' }
				},
				{
					query: {
						$select: [ '-fullName' ]
					}
				}
			)
		],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
