import { Link } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="group block rounded-xl p-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-4">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 group-hover:rotate-[15deg] transition-transform duration-300"
        />
        <div>
          <h2 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {coin.name}
          </h2>
          <p className="uppercase text-sm text-gray-500 dark:text-gray-400">{coin.symbol}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          ${coin.current_price.toLocaleString()}
        </p>
        <p
          className={`mt-1 text-sm font-medium ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? '▲' : '▼'} {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default CoinCard;
