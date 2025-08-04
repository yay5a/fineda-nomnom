require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('Failed to connect to MongoDB server', error);
		console.log('Attempting to connect to locally...');

		try {
			await mongoose.connect('mongodb://localhost:27017/');
			console.log('Connected to local MongoDB');
		} catch (localError) {
			console.log('Failed to connect to locally...');
			throw localError;
		}
	}
};

connectToMongoDB();

module.exports = mongoose;
