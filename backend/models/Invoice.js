const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema(
  {
    orderDate: { type: Date, default: new Date() },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'customers' },
    sentEmail: {
      type: Schema.Types.Boolean,
      default: false,
    },
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
    estimate: {
      type: Schema.Types.ObjectId,
      ref: 'estimates',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('invoices', InvoiceSchema);
