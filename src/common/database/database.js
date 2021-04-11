import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export async function databaseService() {
	await mongoose.connect(`mongodb://${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}
