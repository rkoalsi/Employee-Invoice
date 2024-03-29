const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    gstin: { type: String },
    shop: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'organizations',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('customers', CustomerSchema);
