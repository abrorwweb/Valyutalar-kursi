import { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import Search from "../components/Search"

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
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
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Qidiruv bo‘yicha filter
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Search search={search} setSearch={setSearch} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCoins.map((coin) => (
          <CoinCard  key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Home;
