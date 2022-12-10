import mongoose from 'mongoose';
const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    name: String,
    gstin: String,
    shop: String,
    phone: Number,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('customers', CustomerSchema);
