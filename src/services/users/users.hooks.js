const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const populate = require('feathers-populate-hook');

const getWithLocationData = (context) => {};

module.exports = {
	before: {
		all: [ populate.compatibility() ],
		find: [ authenticate('jwt') ],
		get: [ authenticate('jwt'), getWithLocationData ],
		create: [ hashPassword('password') ],
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
		find: [
			(_) => {
				console.log('a');
			}
		],
		get: [
			populate(
				{
					location: {
						// Destination key
						service: 'location', // Foreign service
						f_key: 'id', // Foreign key
						one: true // Optional, if only one resolve object is wanted
					}
				},
				{
					// defaults query/params
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
