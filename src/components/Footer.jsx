import { Instagram, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 py-10 bg-gradient-to-t from-purple-200 via-blue-100 to-cyan-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">CryptoTracker</h2>
          <p className="text-sm leading-relaxed">
            CryptoTracker — mashhur kriptovalyutalarning narxini real vaqt rejimida kuzatish imkonini beruvchi qulay platforma.
          </p>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Navigatsiya</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Bosh sahifa</Link></li>
            <li><a href="#" className="hover:underline">Portfolio</a></li>
            <li><a href="#" className="hover:underline">Bog‘lanish</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Biz bilan bog‘laning</h2>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/__abdurakhimovv_?igsh=aGdwcTJwcnFwd25y"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="https://t.me/qwerty_0990"
            >
              <Send className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CryptoTracker. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;
