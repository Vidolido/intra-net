import mongoose, { Schema } from 'mongoose';

const templateSchema = new Schema(
  {
    property: {
      type: Schema.Types.Mixed,
    },
    methods: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
    units: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
    limits: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
    result: String,
    marginError: String,
  },
  { strict: true, _id: true }
);

const laboratoryTemplatesSchema = new Schema(
  {
    product: String,
    documentType: String,
    countryOfOrigin: String,
    storage: String,
    template: {
      type: [templateSchema],
      default: undefined,
    },
  },
  {
    strict: true,
  }
);

const LaboratoryTemplate =
  mongoose.models.LaboratoryTemplate ||
  mongoose.model('LaboratoryTemplate', laboratoryTemplatesSchema);

export default LaboratoryTemplate;
