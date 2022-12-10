import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    organizationId: Schema.Types.ObjectId,
    invoices: [Schema.Types.ObjectId],
    salesOrders: [Schema.Types.ObjectId],
    estimates: [Schema.Types.ObjectId],
    isAdmin: Boolean,
    employees: [Schema.Types.ObjectId],
    designation: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('users', UserSchema);
