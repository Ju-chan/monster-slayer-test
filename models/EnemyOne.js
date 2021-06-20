const mongoose = require('mongoose');

// Creating User schema
const EnemySchema = mongoose.Schema({
  image: {
    type: String,
    default: '',
  },
  name: {
    type: 'Basilisk',
    required: true,
  },

  health: {
    type: Number,
    default: 100,
  },
  damage: {
    type: Number,
    default: 50,
  },
});
// Exporting user Schema
module.exports = mongoose.model('user', EnemySchema);
