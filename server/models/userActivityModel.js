const mongoose = require('mongoose');

const UserActionSchema = new mongoose.Schema({
  actionType: String,
  symbol: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserActivity', UserActionSchema);
