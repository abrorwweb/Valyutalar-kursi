import { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import Search from "../components/Search";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });
      setCoins(res.data);
    } catch (err) {
      console.error("Ma'lumotlarni olishda xatolik:", err);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          🔥 Real-Time Kripto Narxlar
        </h1>

        <div className="mb-6">
          <Search search={search} setSearch={setSearch} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              Valyuta topilmadi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
