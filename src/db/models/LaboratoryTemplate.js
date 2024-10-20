import mongoose, { Schema } from 'mongoose';

const groupedSchema = new Schema(
	{
		isGrouped: {
			type: Boolean,
			default: false,
		},
		group: {
			_id: Schema.Types.ObjectId,
			name: {
				type: Map,
				of: String,
			},
		},
	},
	{ _id: false }
);

const parameterSchema = new Schema(
	{
		name: {
			type: Map,
			of: String,
		},
		_id: {
			type: Schema.Types.ObjectId,
		},
	},
	{ _id: false, strict: true }
);

const collectionItemSchema = new Schema(
	{
		value: {
			type: String,
		},
		_id: {
			type: Schema.Types.ObjectId,
		},
	},
	{ _id: false, strict: true }
);

const templateSchema = new Schema(
	{
		parameter: {
			type: parameterSchema,
		},

		collections: {
			type: Map,
			of: [collectionItemSchema],
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
		grouped: { type: groupedSchema, default: undefined },
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ strict: true, _id: true }
);

const laboratoryTemplatesSchema = new Schema(
	{
		header: {
			product: String,
			sampleType: String,
			origin: String,
			documentType: String,
		},
		schemaNames: {
			parameter: {
				type: Schema.Types.Mixed,
			},
			collections: {
				type: Schema.Types.Mixed,
			},
		},
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
	},
	{ _id: true, strict: true }
);

const LaboratoryTemplate =
	mongoose.models.LaboratoryTemplate ||
	mongoose.model('LaboratoryTemplate', laboratoryTemplatesSchema);

export default LaboratoryTemplate;
