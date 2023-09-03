import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CryptoSelector from './CryptoSelector';
import CryptoInfo from './CryptoInfo';
import PriceChart from './PriceChart';


function App() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoInfo, setCryptoInfo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/cryptos')
      .then(response => {
        setCryptos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleSelectCrypto = (selectedSymbol) => {
    setSelectedCrypto(selectedSymbol);
    axios.get(`http://localhost:4000/crypto/${encodeURIComponent(selectedSymbol)}`)
      .then(response => {
        setCryptoInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching additional information: ', error);
        setCryptoInfo(null);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center bg-primary text-white p-3 rounded">
        Cryptocurrency Data
      </h1>
      <CryptoSelector cryptos={cryptos} onSelect={handleSelectCrypto} selectedCrypto={selectedCrypto} />
      <CryptoInfo selectedCrypto={selectedCrypto} cryptoInfo={cryptoInfo} />
      <PriceChart selectedCrypto={selectedCrypto} />
    </div>
  );
}

export default App;
