import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: String,
    sku: String,
    hsn: String,
    price: String,
    gst: String,
    organization: Schema.Types.ObjectId,
    createdBy: Schema.Types.ObjectId,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
module.exports = mongoose.model('products', ProductSchema);
