import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categorie: 0,
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
  },
});

export const { setCategoire, setSearch, setSort } = filterSlice.actions;

export default filterSlice.reducer;
