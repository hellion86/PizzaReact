import React from 'react';
import Categories from './Components/Categories';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaCard from './Components/PizzaCard';
import pizzas from './assets/pizzas.json';
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
            {pizzas.map((obj) => (
              <PizzaCard key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
