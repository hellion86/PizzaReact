import React from 'react';
import Categories from './Components/Components';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaCard from './Components/PizzaCard';
import './scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
