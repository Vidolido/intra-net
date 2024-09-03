import mongoose, { Schema } from 'mongoose';

const sectorSchema = new Schema({
  name: Schema.Types.Mixed,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Sector = mongoose.models.Sector || mongoose.model('Sector', sectorSchema);

export default Sector;
