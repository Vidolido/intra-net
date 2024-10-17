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

const collectionItemsSchema = new Schema(
  {
    inputType: String,
    value: Schema.Types.Mixed,
  },
  { _id: true, strict: true }
);

const collectionSchema = new Schema(
  {
    parameter: {
      type: parameterSchema,
    },

    collections: [
      {
        _id: Schema.Types.ObjectId,
        name: {
          type: Schema.Types.Mixed,
        },
        // items: {
        // 	type: [Schema.Types.Mixed],
        // },
        items: {
          type: [collectionItemsSchema],
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
  { _id: true }
);

const optionsSchemaCollections = new Schema(
  {
    name: {
      type: Schema.Types.Mixed,
    },
    items: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: true }
);

const optionsSchema = new Schema(
  {
    parameter: {
      type: parameterSchema,
    },
    collections: [optionsSchemaCollections],
  },
  { _id: false }
);

const settingsSchema = new Schema(
  {
    settingName: String,
    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sector',
    },
    optionsSchema: {
      type: optionsSchema,
    },
    settings: {
      type: [collectionSchema],
      default: undefined,
    },
    documentStatus: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true }
);

const Setting =
  mongoose.models.Setting || mongoose.model('Setting', settingsSchema);

export default Setting;
