import mongoose, { Schema } from 'mongoose';

const vehicleSchema = new Schema(
	{
		user: String,
		plates: String,
		color: String,
		equipment: String,
		insurance: String,
		vehicleModel: String,
		vehicleType: String,
		inUse: Boolean,
		registration: {
			last: Date,
			next: Date,
		},
		service: {
			small: {
				km: Number,
				date: Date,
			},
			big: {
				km: Number,
				date: Date,
			},
			km: Number,
		},
		tireChange: {
			summer: Date,
			winter: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Vehicle =
	mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
