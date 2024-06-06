import mongoose, { Schema } from 'mongoose';

const parameterSchema = new Schema(
	{
		name: {
			singular: {
				type: Schema.Types.Mixed,
			},
			plural: {
				type: Schema.Types.Mixed,
			},
		},
		inputValue: Schema.Types.Mixed,
	},
	{ _id: false }
);

const collectionSchema = new Schema(
	{
		parameter: {
			type: parameterSchema,
		},
		collections: [
			{
				name: {
					type: Schema.Types.Mixed,
				},
				items: {
					type: [Schema.Types.Mixed],
					default: undefined,
				},
			},
		],
		note: {
			type: String,
			default: undefined,
		},
		tags: {
			type: Schema.Types.Mixed,
			default: undefined,
		},
	},
	{ _id: true, strict: true }
);

const optionsSchema = new Schema(
	{
		parameter: {
			type: parameterSchema,
		},
		collections: [{ name: Schema.Types.Mixed }],
	},
	{ _id: false }
);

const settingsSchema = new Schema(
	{
		settingName: String,
		sector: String,
		optionsSchema: {
			type: optionsSchema,
		},
		collections: {
			type: Schema.Types.Mixed,
		},
		settings: {
			type: [collectionSchema],
			default: undefined,
		},
		documentStatus: String,
	},
	{ strict: true }
);

const Setting =
	mongoose.models.Setting || mongoose.model('Setting', settingsSchema);

export default Setting;
