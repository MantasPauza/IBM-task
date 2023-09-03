import React from 'react';

function CryptoInfo({ selectedCrypto, cryptoInfo }) {
  return (
    <div className="mt-5">
      {selectedCrypto && <h2>Selected Cryptocurrency: {selectedCrypto}</h2>}
      {cryptoInfo && (
        <div className="info-box mt-3">
          <h3>Information:</h3>
          <p><strong>High:</strong> {cryptoInfo.high}</p>
          <p><strong>Low:</strong> {cryptoInfo.low}</p>
        </div>
      )}
    </div>
  );
}

export default CryptoInfo;
