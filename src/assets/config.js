// import React from 'react';

// export const AppContext = React.createContext();

export const apiPath = 'https://6362739d66f75177ea2fed20.mockapi.io/items';

export const makeApiPath = (categorie, sortType, searchValue, currentPage) => {
  const cat = categorie === 0 ? '' : `category=${categorie}&`;
  const search = searchValue ? `&search=${searchValue}` : '';
  const sort = `sortBy=${sortType.property}&order=${sortType.order}${search}`;
  const paginate = `?page=${currentPage}&limit=4&`;
  return `${apiPath}${paginate}${cat}${sort}`;
};

//Selectors
