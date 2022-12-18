const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, required: true },
    invoices: { type: [Schema.Types.ObjectId], default: [] },
    salesOrders: { type: [Schema.Types.ObjectId], default: [] },
    estimates: { type: [Schema.Types.ObjectId], default: [] },
    role: {
      type: String,
      enum: ['customer', 'employee', 'admin'],
      default: 'employee',
      required: true,
    },
    employees: { type: [Schema.Types.ObjectId], default: [] },
    designation: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('users', UserSchema);
