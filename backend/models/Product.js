const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    hsn: { type: String, required: true },
    price: { type: String, required: true },
    gst: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
module.exports = mongoose.model('products', ProductSchema);
