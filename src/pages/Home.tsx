/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import Categories from '../Components/Categories';
import PizzaCard from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/skeleton';
import Sorting from '../Components/Sort';
import Pagination from '../Components/Pagination';
import {
  setCategoire,
  setCurrentPage,
  setFilters,
  selectFilters,
} from '../redux/slices/filterSlice';
import { makeApiPath } from '../assets/config';
import { sortOptions } from '../Components/Sort';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // get data from redux
  const { categorie, searchValue, sortValue, currentPage } =
    useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzas);
  const dispatch = useAppDispatch();

  // make help functions to manage redux state
  const setCat = React.useCallback(
    (index: number) => dispatch(setCategoire(index)),
    []
  );

  const setPagination = React.useCallback(
    (index: number) => dispatch(setCurrentPage(index)),
    []
  );
  // make fake array of componets for skeleton
  // const skeletons = [...Array(4).keys()].map((i) => <Skeleton key={i} />);
  const skeletons = Array.from(Array(4).keys()).map((i) => (
    <Skeleton key={i} />
  ));

  // make pizzas components
  const pizzas = items.map((obj: any) => <PizzaCard key={obj.id} {...obj} />);

  // make url to fetch
  const fetchApiPath = makeApiPath(
    categorie,
    sortValue,
    searchValue,
    currentPage
  );

  // if first render ends - check url params and save to redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortValue = sortOptions.find(
        (obj) => obj.property === params.sortProperty
      );

      if (sortValue) {
        dispatch(
          setFilters({
            categorie: Number(params.categorie),
            currentPage: Number(params.currentPage),
            searchValue: '',
            sortValue,
          })
        );
      }
      isSearch.current = true;
    }
  }, []);

  // if first render ends - fetch pizza
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      // getPizzas();

      dispatch(fetchPizzas(fetchApiPath));
    }
    isSearch.current = false;
  }, [categorie, sortValue, searchValue, currentPage]);

  // if first render complete, and params are changes
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortValue.property,
        categorie,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categorie, sortValue.property, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categorie} setCat={setCat} />
        <Sorting value={sortValue} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Ошибка загрузки 🤣</h2>
          <p>Пицц пока нету, но вы не переживайте, настряпаем!</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'success' ? pizzas : skeletons}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={setPagination} />
    </div>
  );
};

export default Home;
