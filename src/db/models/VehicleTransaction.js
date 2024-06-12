import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
	vehicle: {
		type: mongoose.Types.ObjectId,
		ref: 'Vehicle',
	},
	user: String,
	// userId: {
	// 	type: mongoose.Types.ObjectId,
	// 	ref: 'User',
	// },
	location: String,
	date: Date,
	rentTime: Date,
	returnTime: Date,
	status: String,
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

const Transaction =
	mongoose.models.Transaction ||
	mongoose.model('Transaction', transactionSchema);

export default Transaction;
