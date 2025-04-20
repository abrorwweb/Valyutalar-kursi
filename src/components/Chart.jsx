import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function Chart({ id }) {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        }
      );

      const prices = res.data.prices;
      const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
      const data = prices.map(price => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Narx (USD)',
            data,
            borderColor: 'rgba(59,130,246,1)', // blue-500
            backgroundColor: 'rgba(59,130,246,0.4)', // area uchun
            fill: chartType === 'area',
            tension: 0.4,
          },
        ],
      });
    };

    fetchChartData();
  }, [id, chartType]);

  if (!chartData) return <div>📉 Grafig yuklanmoqda...</div>;

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="chartType" className="block mb-1 font-medium dark:text-white">
          Grafik turini tanlang:
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="p-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="bar">Bar</option>
        </select>
      </div>

      {chartType === 'bar' ? (
        <Bar data={chartData} />
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
}
