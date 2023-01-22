const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    hsn: { type: String, required: true },
    price: { type: String, required: true },
    gst: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'organizations',
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
module.exports = mongoose.model('products', ProductSchema);
