import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categorie: 0,
  currentPage: 1,
  searchValue: '',
  sortValue: { title: 'популярности (DESC)', value: 'rating', order: 'desc' },
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
  },
});

export const { setCategoire, setSearch, setSort, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
