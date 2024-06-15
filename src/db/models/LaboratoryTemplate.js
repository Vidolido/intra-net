import mongoose, { Schema } from 'mongoose';

const templateSchema = new Schema(
	{
		parameter: {
			type: Schema.Types.Mixed,
		},
		items: {
			type: Schema.Types.Mixed,
			default: undefined,
		},
		// methods: {
		// 	type: [Schema.Types.Mixed],
		// 	default: undefined,
		// },
		// units: {
		// 	type: [Schema.Types.Mixed],
		// 	default: undefined,
		// },
		// limits: {
		// 	type: [Schema.Types.Mixed],
		// 	default: undefined,
		// },
		result: String,
		marginError: String,
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ strict: true, _id: true }
);

const basicTemplateSchema = new Schema(
	{
		name: String,
	},
	{ _id: true }
);

const laboratoryTemplatesSchema = new Schema({
	// product: {
	//   type: basicTemplateSchema,
	// },
	// documentType: {
	//   type: basicTemplateSchema,
	// },
	// countryOfOrigin: {
	//   type: basicTemplateSchema,
	// },
	// sampleType: {
	//   type: basicTemplateSchema,
	// },
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
