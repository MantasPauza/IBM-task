import React, { useState } from 'react';

function CryptoSelector({ cryptos, onSelect, selectedCrypto }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setSearchTerm(value);
      const filtered = cryptos.filter((crypto) =>
        crypto.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
  };

  const handleSelect = (crypto) => {
    onSelect(crypto);
    setSearchTerm(crypto);
    setFilteredCryptos([]);
  };

  return (
    <div className="mt-3 position-relative">
      <input
        type="text"
        placeholder="Search Cryptocurrency"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control"
      />
      <small className="form-text text-muted">
        Up to 30 characters allowed.
      </small>
      {filteredCryptos.length > 0 && (
        <div className="position-absolute w-100 bg-white border rounded mt-1">
          {filteredCryptos.map((crypto, index) => (
            <button 
              key={index} 
              type="button" 
              className="list-group-item list-group-item-action" 
              onClick={() => handleSelect(crypto)}
            >
              {crypto}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CryptoSelector;
