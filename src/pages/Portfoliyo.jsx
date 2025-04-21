import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import Navbar from "../components/Navbar";

export default function Portfolio() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("userEmail");
    if (!savedData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(savedData);
      setUser(parsedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
      <Navbar />
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Orqaga tugmasi */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center text-blue-500 hover:text-blue-700 transition"
        >
          <GoArrowLeft size={20} className="mr-1" />
          Orqaga
        </Link>

        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="text-6xl text-blue-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            👋 Salom, <span className="font-semibold">{user.name}</span>
          </p>

          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl w-full text-left">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Profil Ma'lumotlari
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
              <li>📧 <span className="font-medium text-gray-900 dark:text-white">Email:</span> {user.email}</li>
              <li>🎂 <span className="font-medium text-gray-900 dark:text-white">Yosh:</span> {user.age} yosh</li>
              <li>💼 <span className="font-medium text-gray-900 dark:text-white">Sohasi:</span> {user.field}</li>
              <li>🚀 <span className="font-medium text-gray-900 dark:text-white">Status:</span> Faol</li>
              <li>🌍 <span className="font-medium text-gray-900 dark:text-white">Manzil:</span> O‘zbekiston</li>
              <li>⚙️ <span className="font-medium text-gray-900 dark:text-white">Texnologiyalar:</span> React, TailwindCSS</li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            <MdLogout size={20} />
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
