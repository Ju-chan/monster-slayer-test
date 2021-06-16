const mongoose = require('mongoose');

// Creating User schema
const UserSchema = mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  health: {
    type: Number,
    default: 100,
  },
  gold: {
    type: Number,
    default: 100,
  },
  inventory: {
    type: Array,
  },
});
// Exporting user Schema
module.exports = mongoose.model('user', UserSchema);
