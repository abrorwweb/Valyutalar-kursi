import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Navbar from "../components/Navbar";

export default function Markets() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-lg text-blue-500"></span>
        <p className="ml-4 text-lg">Valyutalar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Navbar />
      {/* Back Button */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          <GoArrowLeft size={20} />
          Back
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🪙 Bozor Sharhi</h1>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-300 dark:ring-gray-700">
        <table className="table table-zebra w-full bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Narx</th>
              <th>24h O'zgarish</th>
              <th>Bozor QIymati</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td className="flex items-center gap-2">
                  <Link  to={`/coins/${coin.id}`} className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span>{coin.name}</span>
                    <span className="uppercase text-gray-400">({coin.symbol})</span>
                  </Link>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
