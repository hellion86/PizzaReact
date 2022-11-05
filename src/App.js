import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Header from './Components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
