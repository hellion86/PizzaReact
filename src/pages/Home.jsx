import React from 'react';
import Categories from '../Components/Categories';
import PizzaCard from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/skeleton';
import Sort from '../Components/Sort';
import apiPath from '../assets/config';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(apiPath)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6).keys()].map((i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaCard key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
