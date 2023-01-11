const mongoose = require('mongoose');
const { Schema } = mongoose;

const EstimateSchema = new Schema(
  {
    createdBy: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    organizationId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('estimates', EstimateSchema);
