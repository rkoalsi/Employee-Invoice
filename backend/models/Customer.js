const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    gstin: { type: String, required: true },
    shop: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    organizationId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('customers', CustomerSchema);
