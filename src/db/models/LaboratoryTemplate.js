import mongoose, { Schema } from 'mongoose';

const groupedSchema = new Schema(
	{
		isGrouped: {
			type: Boolean,
			default: false,
		},
		group: {
			type: Schema.Types.Mixed,
		},
	},
	{ _id: false }
);

const templateSchema = new Schema(
	{
		parameter: {
			type: Schema.Types.Mixed,
		},
		items: {
			type: Schema.Types.Mixed,
			default: undefined,
		},

		result: {
			type: String,
			default: '0',
		},
		marginError: {
			type: String,
			default: null,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		grouped: { type: groupedSchema, default: undefined },
	},
	{ strict: true, _id: true }
);

const laboratoryTemplatesSchema = new Schema({
	product: String,
	sampleType: String,
	origin: String,
	documentType: String,
	template: {
		type: [templateSchema],
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

const LaboratoryTemplate =
	mongoose.models.LaboratoryTemplate ||
	mongoose.model('LaboratoryTemplate', laboratoryTemplatesSchema);

export default LaboratoryTemplate;
