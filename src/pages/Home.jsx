import React from 'react';
import Categories from '../Components/Categories';
import PizzaCard from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/skeleton';
import Sort from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { makeApiPath } from '../assets/config';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    title: 'популярности (DESC)',
    value: 'rating',
    order: 'desc',
  });

  const fetchApiPath = makeApiPath(
    categoryId,
    sortType,
    searchValue,
    currentPage
  );
  const skeletons = [...Array(6).keys()].map((i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaCard key={obj.id} {...obj} />);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(fetchApiPath)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, fetchApiPath, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
