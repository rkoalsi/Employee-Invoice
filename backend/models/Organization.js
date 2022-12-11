const mongoose = require('mongoose');
const GSTIN_VALIDATOR = require('../helpers/validator');
const { Schema } = mongoose;

const OrgSchema = new Schema(
  {
    name: { type: String, required: true },
    gstin: {
      type: String,
      required: true,
      unique: true,
      validate: [GSTIN_VALIDATOR, 'Invalid GSTIN Format'],
    },
    location: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('organizations', OrgSchema);
