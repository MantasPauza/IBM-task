const ccxt = require('ccxt');
const UserActivity = require('../models/userActivityModel');

exports.getCryptoData = async (req, res) => {
  const exchange = new ccxt.binance();
  const data = await exchange.fetchTicker('BTC/USDT');
  res.json(data);
};

exports.logUserActivity = (req, res) => {
  const newActivity = new UserActivity({
    action: req.body.action,
    timestamp: new Date()
  });

  newActivity.save()
  .then(activity => {
    res.json(activity);
  })
  .catch(err => {
    res.status(400).json(err);
  });
};