import React, { useState } from "react";
import axios from "axios";

function CryptoSelector({ cryptos, onSelect, selectedCrypto }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [apiError, setApiError] = useState(null);

  let timer;
  let lastCallTimestamp = null;

  const logUserActivity = (actionType, symbol) => {
    if (typeof actionType !== "string" || typeof symbol !== "string") {
      console.error("Invalid parameter types");
      return;
    }

    const now = Date.now();
    if (lastCallTimestamp && now - lastCallTimestamp < 5000) {
      console.warn("Too many requests. Skipping.");
      return;
    }
    lastCallTimestamp = now;

    axios
      .post("http://localhost:4000/api/logActivity", { actionType, symbol })
      .then((response) => {
        console.log("Logged user activity:", response.data);
      })
      .catch((error) => {
        console.error("Error logging user activity:", error);
        setApiError(true);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    clearTimeout(timer);

    if (value.length <= 30) {
      setSearchTerm(value);
      setIsInvalid(false);

      timer = setTimeout(() => {
        const filtered = cryptos.filter((crypto) =>
          crypto.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCryptos(filtered);
        logUserActivity("searched", value);
      }, 300);
    } else {
      setIsInvalid(true);
    }
  };

  const handleSelect = (crypto) => {
    setApiError(null);
    if (!cryptos.includes(crypto)) {
      console.error("Invalid selection");
      setIsInvalid(true);
      return;
    }

    onSelect(crypto);
    setSearchTerm(crypto);
    setFilteredCryptos([]);
    logUserActivity("selected", crypto);
  };

  return (
    <div className="mt-3 position-relative">
      {isInvalid && (
        <small className="form-text text-danger">
          Invalid input. Up to 30 characters allowed.
        </small>
      )}
      {apiError && <p className="text-danger">Error logging your activity.</p>}
      <input
        type="text"
        placeholder="Search Cryptocurrency"
        value={searchTerm}
        onChange={handleSearch}
        className={`form-control ${isInvalid ? "is-invalid" : ""}`}
        onClick={() => setSearchTerm("")}
      />
      {filteredCryptos.length > 0 && (
        <div className="position-absolute w-100 bg-white border rounded mt-1">
          {filteredCryptos.map((crypto, index) => (
            <div
              key={index}
              className="p-2 dropdown-item"
              onClick={() => handleSelect(crypto)}
            >
              {crypto}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CryptoSelector;
