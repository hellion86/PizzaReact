import { createSlice } from '@reduxjs/toolkit';

export const selectFilters = (state) => state.filter;

const initialState = {
  categorie: 0,
  currentPage: 1,
  searchValue: '',
  sortValue: {
    title: 'популярности (DESC)',
    property: 'rating',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoire: (state, action) => {
      state.categorie = action.payload;
    },
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sortValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortValue = action.payload.sortValue;
      state.currentPage = Number(action.payload.currentPage);
      state.categorie = Number(action.payload.categorie);
    },
  },
});

export const { setCategoire, setSearch, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
