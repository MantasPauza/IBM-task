import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ selectedCrypto }) {
  const startDatePlaceholder = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const endDatePlaceholder = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(startDatePlaceholder);
  const [endDate, setEndDate] = useState(endDatePlaceholder);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!selectedCrypto || !startDate || !endDate) return;

    setIsLoading(true);
    setErrorMessage(null); // Reset error message when fetching new data

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/ohlcv/${encodeURIComponent(
            selectedCrypto
          )}?startDate=${startDate}&endDate=${endDate}`
        );
        const ohlcv = response.data;

        if (ohlcv.length === 0) {
          setErrorMessage("No data available for the selected date range.");
          setIsLoading(false);
          return;
        }

        const labels = ohlcv.map((x) => new Date(x[0]).toLocaleString());
        const prices = ohlcv.map((x) => x[4]);

        setData({
          labels,
          datasets: [
            {
              label: selectedCrypto,
              data: prices,
              fill: false,
              backgroundColor: "blue",
              borderColor: "blue",
            },
          ],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCrypto, startDate, endDate]);

  return (
    <div>
      <h2>Price Chart</h2>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      {isLoading ? (
        <div>
          Loading... <span className="spinner-border spinner-border-sm"></span>
        </div>
      ) : null}
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}
      {data && data.labels ? <Line data={data} /> : "No Data"}
    </div>
  );
}

export default PriceChart;
