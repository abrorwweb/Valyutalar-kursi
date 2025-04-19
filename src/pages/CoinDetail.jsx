import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from '../components/Chart';

export default function CoinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCoin(null);
    setLoading(true);
    setError(null);

    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoin(response.data);
      } catch (err) {
        setError(err.message);
        if (err.response?.status === 404) {
          navigate('/', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();

    return () => {
      const source = axios.CancelToken.source();
      source.cancel("Komponent yopildi, so'rov bekor qilindi");
    };
  }, [id, navigate]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCoin(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-lg">⏳ Yuklanmoqda...</div>;
  if (error) return <div className="text-red-500 text-center py-8">❌ Xato: {error}</div>;
  if (!coin) return <div className="text-center py-8">Ma'lumot topilmadi</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="text-blue-500 hover:underline hover:text-blue-700 transition duration-200"
        >
          ← Ortga qaytish
        </Link>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:brightness-110 transition"
        >
          🔄 Yangilash
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6 transition">
        <div className="flex items-center gap-6">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-20 h-20 rounded-full border border-gray-300 dark:border-gray-600"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-1">
              💲 {coin.market_data.current_price.usd.toLocaleString()} USD
            </p>
          </div>
        </div>

        {coin.description.en && (
          <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📈 Narx Grafigi</h2>
        <Chart id={id} />
      </div>
    </div>
  );
}
