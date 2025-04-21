import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Markets from './pages/Maket'; 
import Login from './pages/Login';
import Portfolio from './pages/Portfoliyo';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coins/:id" element={<CoinDetail />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/login" element={<Login />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}
