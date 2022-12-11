const mongoose = require('mongoose');
const { Schema } = mongoose;

const EstimateSchema = new Schema(
  {
    createdBy: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('estimates', EstimateSchema);
