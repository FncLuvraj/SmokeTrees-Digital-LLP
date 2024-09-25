// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
});

module.exports = mongoose.model('User', UserSchema);
