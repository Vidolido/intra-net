import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema(
  {
    name: {
      type: Schema.Types.Mixed,
    },
    collection: {
      type: [collectionType],
      default: undefined,
    },
  },
  { _id: false }
);

const settingsSchema = new Schema({
  settingName: String,
  sector: String,
  parameter: {
    name: {
      singular: String,
      plural: String,
    },
  },
  collections: {
    type: [collectionSchema],
    default: undefined,
  },
});

const Setting =
  mongoose.models.Setting || mongoose.model('Setting', settingsSchema);

export default Setting;
