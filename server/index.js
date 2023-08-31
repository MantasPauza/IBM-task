const express = require('express');
const cors = require('cors');
const ccxt = require('ccxt');

const app = express();
app.use(cors());

const port = 4000;

app.get('/cryptos', async (req, res) => {
  const exchange = new ccxt.binance();
  const markets = await exchange.loadMarkets();
  const symbols = Object.keys(markets);
  res.json(symbols);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/crypto/:symbol', async (req, res) => {
  console.log("Received request for symbol: ", req.params.symbol);
  try {
    console.log("Symbol received:", req.params.symbol);
    const { symbol } = req.params;
    const exchange = new ccxt.binance();
    const ticker = await exchange.fetchTicker(symbol);
    res.json(ticker);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('An error occurred');
  }
});

