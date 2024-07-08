import mongoose, { Schema } from 'mongoose';

const fieldsSchema = new Schema(
	{
		name: {
			type: Schema.Types.Mixed,
		},
		value: {
			type: String,
		},
		checked: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: true }
);

const analysisSchema = new Schema({
	// product: {
	// 	type: Schema.Types.Mixed,
	// },
	// documentType: {
	// 	type: Schema.Types.Mixed,
	// },
	// sampleType: {
	// 	type: Schema.Types.Mixed,
	// },
	// origin: {
	// 	type: Schema.Types.Mixed,
	// },
	fields: {
		type: [fieldsSchema],
		default: undefined,
	},
	templateId: String,
	template: {
		type: Schema.Types.Mixed,
		default: undefined,
	},
	note: {
		type: String,
		default: undefined,
	},
	documentStatus: {
		type: String,
		default: 'draft',
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

const Analysis =
	mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);

export default Analysis;
