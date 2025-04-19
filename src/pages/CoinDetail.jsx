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
    // Holatlarni qayta tiklash
    setCoin(null);
    setLoading(true);
    setError(null);

    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoin(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Ma'lumotlarni olishda xato:", err);
        
        // Agar valyuta topilmasa, asosiy sahifaga qaytish
        if (err.response?.status === 404) {
          navigate('/', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();

    // Komponent unmount bo'lganda so'rovni bekor qilish
    return () => {
      const source = axios.CancelToken.source();
      source.cancel("Komponent yopildi, so'rov bekor qilindi");
    };
  }, [id, navigate]); // id yoki navigate o'zgarganda qayta ishlaydi

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

  if (loading) return <div className="text-center py-8">Yuklanmoqda...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Xato: {error}</div>;
  if (!coin) return <div className="text-center py-8">Ma'lumot topilmadi</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Ortga qaytish
        </Link>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Yangilash
        </button>
      </div>
      
      {/* Qolgan UI kodlari... */}
    </div>
  );
}