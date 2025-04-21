import { Link } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link
      to={`/coins/${coin.id}`}
      className="min-w-[200px] bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 duration-300 group"
    >
      
      <img
        src={coin.image}
        alt={coin.name}
        className="w-12 h-12 mb-3 rounded-full border border-gray-300 dark:border-gray-600 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"
      />

      
      <h2 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300">
        {coin.name}
      </h2>

      
      <p className="uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400">
        {coin.symbol}
      </p>

      
      <p className="mt-3 text-xl font-semibold text-gray-800 dark:text-white">
        ${coin.current_price.toLocaleString()}
      </p>

      
      <p
        className={`mt-1 text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? '▲' : '▼'} {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </Link>
  );
};

export default CoinCard;
