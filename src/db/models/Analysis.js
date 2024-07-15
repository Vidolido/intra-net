import mongoose, { Schema } from 'mongoose';

const fieldsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: Schema.Types.Mixed,
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

const analysisSchema = new Schema({
  header: {
    product: String,
    origin: String,
    sampleType: String,
    documentType: String,
  },
  fields: [fieldsSchema],
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
