import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrgSchema = new Schema(
  {
    name: String,
    gstin: String,
    location: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('organizations', OrgSchema);
