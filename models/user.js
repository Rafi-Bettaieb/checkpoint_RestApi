const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min : 0,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model('User', userSchema);
