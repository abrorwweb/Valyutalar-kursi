import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ coinId }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        );
        setChartData(response.data.prices);
      } catch (error) {
        console.error("Grafik ma'lumotlarini olishda xato:", error);
      }
    };

    fetchChartData();
  }, [coinId]);

  if (!chartData.length) return <div className="text-center py-4">Grafik yuklanmoqda...</div>;

  return (
    <div className="mt-6">
      <Line
        data={{
          labels: chartData.map(([timestamp]) => 
            new Date(timestamp).toLocaleDateString()),
          datasets: [{
            label: 'Narx (USD)',
            data: chartData.map(([, price]) => price),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.1
          }]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (context) => `$${context.parsed.y.toFixed(2)}`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `$${value}`
              }
            }
          }
        }}
      />
    </div>
  );
}