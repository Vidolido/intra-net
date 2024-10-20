import mongoose, { Schema } from 'mongoose';

// const fieldsSchema = new Schema({
// 	_id: Schema.Types.ObjectId,
// 	name: {
// 		type: Schema.Types.Mixed,
// 	},
// 	order: {
// 		type: Number,
// 		default: 0,
// 	},
// 	inputType: {
// 		type: String,
// 		default: 'text',
// 	},
// 	value: {
// 		type: Schema.Types.Mixed,
// 	},
// 	checked: {
// 		type: {
// 			type: String,
// 		},
// 	},
// });

// const fieldsSchema = new Schema(
// 	{
// 		_id: Schema.Types.ObjectId,
// 		name: {
// 			type: Map,
// 			of: String,
// 		},
// 		order: {
// 			type: Number,
// 			default: 0,
// 		},
// 		data: {
// 			type: Schema.Types.Mixed,
// 			default: undefined,
// 		},
// 	},
// 	{ strict: true, _id: false }
// );

// const basicInfoSchema = new Schema(
// 	{
// 		customer: {
// 			customerId: {
// 				type: Schema.Types.Mixed,
// 				default: undefined,
// 			},
// 			order: {
// 				type: Number,
// 				default: 0,
// 			},
// 		},
// 		fields: {
// 			type: [fieldsSchema],
// 		},
// 	},
// 	{ strict: true, _id: false }
// );
const additionalDocumentInfoSchema = new Schema(
	{
		customer: {
			_id: Schema.Types.ObjectId,
			name: {
				type: Map,
				of: String,
			},
			customerData: Schema.Types.Mixed,
		},
		productAlias: {
			_id: Schema.Types.ObjectId,
			name: {
				type: Map,
				of: String,
			},
		},
	},
	{ strict: true, _id: false }
);

const documentMetaSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		name: {
			type: Map,
			of: String,
		},
		order: {
			type: Number,
			default: 0,
		},
		checked: Boolean,
		links: {
			type: [String],
		},
		value: Schema.Types.Mixed,
	},
	{ strict: true, _id: false }
);

const documentSchema = new Schema(
	{
		header: {
			product: String,
			origin: String,
			sampleType: String,
			documentType: String,
		},
		// fields: [fieldsSchema], // delete this after setting basic info
		// basicInfo: basicInfoSchema,
		documentMeta: {
			type: [documentMetaSchema],
		},
		additionalDocumentInfo: {
			type: additionalDocumentInfoSchema,
		},
		templateId: String,
		template: {
			type: Schema.Types.Mixed,
			default: undefined,
		},
		relatedDocuments: {
			type: Schema.Types.Mixed,
			default: [],
		},
		notes: {
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
	},
	{ timestamps: true }
);

const Document =
	mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
