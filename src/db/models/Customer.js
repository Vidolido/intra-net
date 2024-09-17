import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
	name: Schema.Types.Mixed,
	address: Schema.Types.Mixed,
	phone: String,
	mobile: String,
	email: String,
	state: Schema.Types.Mixed,
	city: Schema.Types.Mixed,
	customerType: String,
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

const Customer =
	mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
