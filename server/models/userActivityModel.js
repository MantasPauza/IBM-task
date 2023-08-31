const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
  action: String,
  timestamp: Date
});

module.exports = mongoose.model('UserActivity', UserActivitySchema);