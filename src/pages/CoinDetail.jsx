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

  // ✅ DaisyUI spinner
  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return <div className="text-red-500 text-center py-10">❌ Xato: {error}</div>;
  if (!coin) return <div className="text-center py-10">Ma'lumot topilmadi</div>;

  const { image, name, symbol, market_data, description, market_cap_rank } = coin;

  const shortDescription = description.en
    ? description.en.replace(/<[^>]+>/g, '').split('. ').slice(0, 2).join('. ') + '.'
    : 'Tavsif mavjud emas.';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="text-blue-500 hover:underline hover:text-blue-700 transition duration-200">
          ← Ortga qaytish
        </Link>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition"
        >
          🔄 Yangilash
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 mb-8 transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src={image.large} alt={name} className="w-24 h-24 rounded-full border shadow" />
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {name} <span className="uppercase text-gray-400">({symbol})</span>
            </h1>
            <p className="text-xl mt-2 text-gray-700 dark:text-gray-300">
              💲 {market_data.current_price.usd.toLocaleString()} USD
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">📊 Rank: #{market_cap_rank}</p>
          </div>
        </div>

        <div className="mt-6 text-gray-700 dark:text-gray-300 text-md leading-relaxed">
          {shortDescription}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-700 dark:text-gray-200">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500">🧢 Bozor qiymati</p>
            <p className="font-semibold">${market_data.market_cap.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500">🔊 Savdo hajmi (24h)</p>
            <p className="font-semibold">${market_data.total_volume.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500">📈 Eng yuqori (24h)</p>
            <p className="font-semibold">${market_data.high_24h.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500">📉 Eng past (24h)</p>
            <p className="font-semibold">${market_data.low_24h.usd.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📉 Narx Grafigi</h2>
        <Chart id={id} />
      </div>
    </div>
  );
}
