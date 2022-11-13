import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Categories from '../Components/Categories';
import PizzaCard from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/skeleton';
import Sort from '../Components/Sort';
import Pagination from '../Components/Pagination';
import {
  setCategoire,
  setSort,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { makeApiPath } from '../assets/config';
import { sortOptions } from '../Components/Sort';

const Home = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // get data from redux
  const { categorie, searchValue, sortValue, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  // make help functions to manage redux state
  const setCat = (index) => dispatch(setCategoire(index));
  const setSorting = (sort) => dispatch(setSort(sort));
  const setPagination = (index) => dispatch(setCurrentPage(index));

  // pizzas aray
  const [items, setItems] = React.useState([]);

  // make fake array of componets for skeleton
  const skeletons = [...Array(4).keys()].map((i) => <Skeleton key={i} />);

  // make pizzas components
  const pizzas = items.map((obj) => <PizzaCard key={obj.id} {...obj} />);

  // make url to fetch
  const fetchApiPath = makeApiPath(
    categorie,
    sortValue,
    searchValue,
    currentPage
  );

  // fetch pizza
  const fetchPizzas = () => {
    setIsLoading(true);
    axios.get(fetchApiPath).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  };

  // if first render ends - check url params and save to redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortValue = sortOptions.find(
        (obj) => obj.property === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortValue,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // if first render ends - fetch pizza
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
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
        <Sort value={sortValue} onChangeSort={setSorting} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setPagination(number)} />
    </div>
  );
};

export default Home;
