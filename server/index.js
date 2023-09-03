const express = require('express');
const cors = require('cors');
const ccxt = require('ccxt');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
  
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);


app.get("/ohlcv/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const { startDate, endDate } = req.query;
    
    const exchange = new ccxt.binance();
    let ohlcv;

    if (startDate && endDate) {
      const since = exchange.parse8601(`${startDate}T00:00:00Z`);
      const till = exchange.parse8601(`${endDate}T23:59:59Z`);
      ohlcv = await exchange.fetchOHLCV(symbol, '1d', since, till);
    } else {
      ohlcv = await exchange.fetchOHLCV(symbol, '1d');
    }
    res.json(ohlcv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/cryptos', async (req, res) => {
  const exchange = new ccxt.binance();
  const markets = await exchange.loadMarkets();
  const symbols = Object.keys(markets);
  res.json(symbols);
});

app.get('/crypto/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const exchange = new ccxt.binance();
    const ticker = await exchange.fetchTicker(symbol);
    res.json(ticker);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('An error occurred');
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
