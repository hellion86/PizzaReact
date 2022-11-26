import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import pizzaSlise from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    pizzas: pizzaSlise,
  },
});
