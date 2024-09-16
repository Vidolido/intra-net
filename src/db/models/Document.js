import mongoose, { Schema } from 'mongoose';

const fieldsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: Schema.Types.Mixed,
  },
  order: {
    type: Number,
    default: 0,
  },
  inputType: {
    type: String,
    default: 'text',
  },
  value: {
    type: Schema.Types.Mixed,
  },
  checked: {
    type: {
      type: String,
    },
  },
});

const documentSchema = new Schema(
  {
    header: {
      product: String,
      origin: String,
      sampleType: String,
      documentType: String,
    },
    // identificationNumbers: {
    // 	type: Schema.Types.Mixed,
    // 	default: [],
    // },
    fields: [fieldsSchema],
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
