import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema(
	{
		parameter: {
			name: {
				singular: Schema.Types.Mixed,
				plural: Schema.Types.Mixed,
			},
			value: Schema.Types.Mixed,
		},
		collections: [
			{
				name: {
					type: Schema.Types.Mixed,
				},
				collection: {
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
	{ _id: false, strict: true }
);

const optionsSchema = new Schema(
	{
		parameter: {
			name: {
				singular: Schema.Types.Mixed,
				plural: Schema.Types.Mixed,
			},
		},
		collections: [{ name: Schema.Types.Mixed }],
		// collections: {
		// 	type: {
		// 		name: Schema.Types.Mixed,
		// 	},
		// },
	},
	{ _id: true, strict: true }
);

const settingsSchema = new Schema(
	{
		settingName: String,
		sector: String,
		optionsSchema: {
			type: optionsSchema,
		},
		settings: {
			type: [collectionSchema],
		},
	},
	{ strict: true }
);

const Setting =
	mongoose.models.Setting || mongoose.model('Setting', settingsSchema);

export default Setting;
