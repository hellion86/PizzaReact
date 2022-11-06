const apiPath = 'https://6362739d66f75177ea2fed20.mockapi.io/items';

export const makeApiPath = (categorie, sortType) => {
  const cat = categorie === 0 ? '?' : `?category=${categorie}&`;
  const sort = `sortBy=${sortType.value}&order=${sortType.order}`;
  return `${apiPath}${cat}${sort}`;
};
