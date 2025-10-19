import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ButtonDemo from './pages/ButtonDemo';
import Home from './pages/Home';
import InputDemo from './pages/InputDemo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputDemo />} />
        <Route path="/button" element={<ButtonDemo />} />
      </Routes>
    </Router>
  );
}
