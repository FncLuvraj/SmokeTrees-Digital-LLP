// models/Address.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  address: String,
});

module.exports = mongoose.model('Address', AddressSchema);
