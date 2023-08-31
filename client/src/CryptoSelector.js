import React from 'react';

function CryptoSelector({ cryptos, onSelect, selectedCrypto }) {
  return (
    <div className="mt-3">
      <select className="form-select" value={selectedCrypto || ''} onChange={(e) => onSelect(e.target.value)}>
        <option value="" disabled>Select a Cryptocurrency</option>
        {cryptos.map((crypto, index) => (
          <option key={index} value={crypto}>
            {crypto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CryptoSelector;
