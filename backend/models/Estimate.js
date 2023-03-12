const mongoose = require('mongoose');
const { Schema } = mongoose;

const EstimateSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'customers' },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'products',
        },
        amount: { type: Number, required: true },
      },
    ],
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'organizations',
    },
    total: {
      type: Schema.Types.Number,
      required: true,
    },
    salesOrder: {
      type: Schema.Types.ObjectId,
      ref: 'salesOrders',
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'invoices',
    },
  },

  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('estimates', EstimateSchema);
