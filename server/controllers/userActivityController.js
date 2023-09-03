const UserActivity = require('../models/userActivityModel');

const validateActivityData = (actionType, symbol) => {
  if (!actionType || !symbol) {
    return false;
  }
  return true;
};

exports.logUserActivity = async (req, res) => {
  const { actionType, symbol } = req.body;

  if (!validateActivityData(actionType, symbol)) {
    return res.status(400).json({ message: 'Bad Request: Missing or invalid fields.' });
  }

  const newActivity = new UserActivity({
    actionType,
    symbol,
    timestamp: new Date(),
  });

  try {
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.log("MongoDB Error:", error);
    res.status(400).json({ message: 'Bad Request', error });
  }
};
