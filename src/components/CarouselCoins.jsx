import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CarouselCoins() {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 15,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error('Xatolik:', err);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="mt-[100px] w-full overflow-hidden py-6 bg-black/90 rounded-xl shadow-2xl border border-purple-600">
      <div className="flex animate-scroll gap-6 px-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate(`/coins/${coin.id}`)}
            className="min-w-[220px] cursor-pointer bg-white/10 backdrop-blur-md border border-purple-400 rounded-2xl p-4 shadow-lg hover:scale-110 transition-all duration-500 hover:shadow-purple-500/50 hover:border-pink-500"
          >
            <div className="flex flex-col items-center space-y-2">
              <img src={coin.image} alt={coin.name} className="w-14 h-14" />
              <h2 className="text-lg font-semibold text-white">{coin.name}</h2>
              <p className="text-sm text-gray-300">${coin.current_price.toLocaleString()}</p>
              <p
                className={`text-sm font-medium ${
                  coin.price_change_percentage_24h > 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
