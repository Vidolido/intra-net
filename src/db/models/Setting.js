import mongoose, { Schema } from 'mongoose';

const parameterSchema = new Schema(
	{
		name: {
			singular: {
				type: Map,
				of: String,
			},
			plural: {
				type: Map,
				of: String,
			},
		},
	},
	{ _id: false, strict: true }
);

const collectionSchema = new Schema(
	{
		name: {
			type: Map,
			of: String,
		},
	},
	{ _id: true, strict: true }
);

const optionsSchema = new Schema(
	{
		parameter: {
			type: parameterSchema,
		},
		collections: [collectionSchema],
	},
	{ _id: false, strict: true }
);

const settingCollectionItemSchema = new Schema(
	{
		inputType: {
			type: String,
			required: true,
		},
		value: {
			type: Schema.Types.Mixed,
			required: true,
		},
	},
	{ _id: true, strict: true }
);

const settingsCollectionSchema = new Schema(
	{
		parameter: {
			type: Map,
			of: String,
		},
		collections: {
			type: Map,
			of: [settingCollectionItemSchema],
		},
	},
	{ _id: true }
);

const settingsSchema = new Schema(
	{
		settingName: {
			type: String,
		},
		sector: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Sector',
		},
		optionsSchema: {
			type: optionsSchema,
			default: undefined,
		},
		settings: {
			type: [settingsCollectionSchema],
			default: undefined,
		},
		documentStatus: {
			type: String,
			enum: ['draft', 'published'],
			default: 'draft',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ strict: true, _id: true }
);

const Setting =
	mongoose.models.Setting || mongoose.model('Setting', settingsSchema);

export default Setting;
