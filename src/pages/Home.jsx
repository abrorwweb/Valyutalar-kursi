import { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // ⬅️ loader state

  const getData = async () => {
    try {
      setLoading(true); // loader boshlanishi
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
    } finally {
      setLoading(false); // loader tugashi
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="mt-6 mb-8">
          <Search search={search} setSearch={setSearch} />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <p className="text-gray-500 dark:text-gray-400 text-lg">Valyutalar yuklanmoqda...</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
