import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFilters = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortValue;

export type Sort = {
  title: string;
  property: 'rating' | 'title' | 'price';
  order: 'desc' | 'asc';
};

interface FilterSliceState {
  categorie: number;
  currentPage: number;
  searchValue: string;
  sortValue: Sort;
}

const initialState: FilterSliceState = {
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
    setCategoire: (state, action: PayloadAction<number>) => {
      state.categorie = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sortValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sortValue = action.payload.sortValue;
      state.currentPage = action.payload.currentPage;
      state.categorie = action.payload.categorie;
    },
  },
});

export const { setCategoire, setSearch, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
