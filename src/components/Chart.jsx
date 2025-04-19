import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function Chart({ id }) {
  const [chartData, setChartData] = useState(null);

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
      setChartData({
        labels: prices.map(price => new Date(price[0]).toLocaleDateString()),
        datasets: [
          {
            label: 'Narx (USD)',
            data: prices.map(price => price[1]),
            borderColor: 'rgba(59,130,246,1)', // blue-500
            fill: false,
            tension: 0.3,
          },
        ],
      });
    };

    fetchChartData();
  }, [id]);

  if (!chartData) return <div>Grafig yuklanmoqda...</div>;

  return (
    <Line data={chartData} />
  );
}
