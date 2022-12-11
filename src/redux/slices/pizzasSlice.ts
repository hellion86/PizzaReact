import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

export const selectPizzas = (state: RootState) => state.pizzas;

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (path: string) => {
    const { data } = await axios.get<Pizza[]>(path);
    return data;
  }
);

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // load, success, error
};

export const pizzaSlise = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setItems: (state, action: PayloadAction<Pizza[]>) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// export const { setItems } = pizzaSlise.actions;

export default pizzaSlise.reducer;
