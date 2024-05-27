import { connect } from 'mongoose';
const connectionString = process.env.MONGO_URI;

if (!connectionString) {
	throw new Error('Please define a db');
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			family: 4, // Use IPv4, skip trying IPv6
		};

		cached.promise = connect(connectionString, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}
	return cached.conn;
}
export default dbConnect;
