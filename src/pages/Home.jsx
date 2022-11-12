import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../Components/Categories';
import PizzaCard from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/skeleton';
import Sort from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { setCategoire, setSort } from '../redux/slices/filterSlice';
import { makeApiPath } from '../assets/config';

const Home = () => {
  const { categorie, searchValue, sortValue } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const setCat = (index) => dispatch(setCategoire(index));
  const setSorting = (sort) => dispatch(setSort(sort));

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchApiPath = makeApiPath(
    categorie,
    sortValue,
    searchValue,
    currentPage
  );
  const skeletons = [...Array(4).keys()].map((i) => <Skeleton key={i} />);
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
  }, [categorie, sortValue, searchValue, fetchApiPath, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categorie} setCat={setCat} />
        <Sort value={sortValue} onChangeSort={setSorting} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
