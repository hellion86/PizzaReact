import React from 'react';
import Categories from './Components/Categories';
import Header from './Components/Header';
import Sort from './Components/Sort';
import PizzaCard from './Components/PizzaCard';
import pizzas from './assets/pizzas.json';
import './scss/app.scss';

function App() {
  // https://6362739d66f75177ea2fed20.mockapi.io/items
  const mockapiUrl = 'https://6362739d66f75177ea2fed20.mockapi.io/items';
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch(mockapiUrl)
      .then((data) => {
        // console.log(data);
        return data.json();
      })
      .then((data) => {
        setItems(data);
      });
  }, []);
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
            {items.map((obj) => (
              <PizzaCard key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
