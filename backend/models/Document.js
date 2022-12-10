import mongoose from 'mongoose';
const { Schema } = mongoose;

const DocumentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['invoice', 'sales order', 'estimate'],
      default: 'estimate',
    },
    createdBy: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    orderDate: { type: Date, default: new Date() },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('documents', DocumentSchema);
