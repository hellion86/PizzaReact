import React from 'react';
import Categories from './Components/Components';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaCard from './Components/PizzaCard';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaCard title="Мексиканская" price="350" />
            <PizzaCard title="Русска" price="150" />
            <PizzaCard title="Итальянская" price="450" />
            <PizzaCard title="Любимая" price="550" />
            <PizzaCard title="Пицца папы" price="650" />
            <PizzaCard title="Просто ХЗ" price="250" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
