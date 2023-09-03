import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!selectedCrypto || !startDate || !endDate) return;

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ohlcv/${encodeURIComponent(selectedCrypto)}?startDate=${startDate}&endDate=${endDate}`);
        const ohlcv = response.data;
        const labels = ohlcv.map(x => new Date(x[0]).toLocaleString());
        const prices = ohlcv.map(x => x[4]);

        setData({
          labels,
          datasets: [{
            label: selectedCrypto,
            data: prices,
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'blue',
          }],
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>
      {isLoading ? 'Loading...' : (data && data.labels ? <Line data={data} /> : 'No Data')}
    </div>
  );
}

export default PriceChart;
