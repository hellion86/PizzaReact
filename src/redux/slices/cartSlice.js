import { createSlice } from '@reduxjs/toolkit';

const calculateTotalPrice = (state) =>
  state.items.reduce((acc, item) => (acc += item.count * item.price), 0);

const calculateTotalCount = (state) =>
  state.items.reduce((acc, item) => (acc += item.count), 0);

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items = [...state.items, { ...action.payload, count: 1 }];
      }
      state.totalPrice = calculateTotalPrice(state);
      state.totalCount = calculateTotalCount(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state);
      state.totalCount = calculateTotalCount(state);
    },

    minusItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem.count === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        findItem.count -= 1;
      }
      state.totalPrice = calculateTotalPrice(state);
      state.totalCount = calculateTotalCount(state);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
