import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email,
      name,
      age,
      field,
    };
    localStorage.setItem("userEmail", JSON.stringify(userData));
    navigate("/portfolio");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <Navbar />
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Orqaga tugmasi */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition"
        >
          <GoArrowLeft size={18} />
          Orqaga
        </Link>

        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
          <FaSignInAlt />
          Kirish
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Yoshingiz"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Sohangiz (Frontend, Backend, Designer...)"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Kirish
          </button>
        </div>
      </div>
    </div>
  );
}
