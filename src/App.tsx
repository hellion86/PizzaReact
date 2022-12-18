import { Routes, Route } from 'react-router-dom';
import React from 'react';
// import Cart from './pages/Cart';
import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layout/MainLayout';
import './scss/app.scss';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка....</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
