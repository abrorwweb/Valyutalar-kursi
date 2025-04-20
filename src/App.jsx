import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Markets from './pages/Maket'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CoinDetail />} />
      <Route path="/markets" element={<Markets />} />
    </Routes>
  );
}
