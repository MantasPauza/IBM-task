const mongoose = require("mongoose");

const UserActionSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ["searched", "selected"],
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("UserActivity", UserActionSchema);
