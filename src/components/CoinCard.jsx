// components/CoinCard.jsx
import { Link } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`} className="cursor-pointer card bg-base-100 shadow p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <img src={coin.image} alt={coin.name} className="w-10 h-10" />
      <div>
        <h2 className="text-lg font-semibold">{coin.name}</h2>
        <p>${coin.current_price.toLocaleString()}</p>
        <p className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default CoinCard;