const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema(
  {
    createdBy: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    orderDate: { type: Date, default: new Date() },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('invoices', InvoiceSchema);
