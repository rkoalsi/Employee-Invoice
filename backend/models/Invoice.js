const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema(
  {
    createdBy: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    orderDate: { type: Date, default: new Date() },
    organizationId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('invoices', InvoiceSchema);
