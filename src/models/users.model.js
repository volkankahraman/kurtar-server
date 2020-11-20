// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const modelName = 'users';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema(
		{
			email: { type: String, unique: true, lowercase: true, sparse: true },
			username: { type: String, unique: true, lowercase: true, sparse: true },
			fullName: { type: String, required: true },
			phoneNum: { type: String },
			password: { type: String },
			helpers: [
				{
					type: mongooseClient.Schema.Types.ObjectId,
					ref: 'helpers'
				}
			],
			userSettings: {
				type: mongooseClient.Schema.Types.ObjectId,
				ref: 'userSettings',
				default: null
			},
			lastKnownLocation: {
				type: mongooseClient.Schema.Types.ObjectId,
				ref: 'location',
				default: null
			},
			userType: {
				type: String,
				enum: [ 'CITIZEN', 'SAVER' ],
				default: 'CITIZEN'
			}
		},
		{
			timestamps: true
		}
	);

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes(modelName)) {
		mongooseClient.deleteModel(modelName);
	}
	return mongooseClient.model(modelName, schema);
};
