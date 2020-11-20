// userSettings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const modelName = 'userSettings';
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;
	const schema = new Schema(
		{
			notification: { type: Boolean, default: false },
			theme: { type: String, enum: [ 'LIGHT', 'DARK' ], default: 'LIGHT' },
			language: { type: String, enum: [ 'TR', 'EN' ], default: 'TR' }
		},
		{
			timestamps: false
		}
	);

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes(modelName)) {
		mongooseClient.deleteModel(modelName);
	}
	return mongooseClient.model(modelName, schema);
};
