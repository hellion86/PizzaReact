import { createSlice } from '@reduxjs/toolkit';

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
      state.totalPrice = state.items.reduce(
        (acc, item) => (acc += item.count * item.price),
        0
      );
      state.totalCount = state.items.reduce(
        (acc, item) => (acc += item.count),
        0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (acc, item) => (acc += item.count * item.price),
        0
      );
      state.totalCount = state.items.reduce(
        (acc, item) => (acc += item.count),
        0
      );
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
      state.totalPrice = state.items.reduce(
        (acc, item) => (acc += item.count * item.price),
        0
      );
      state.totalCount = state.items.reduce(
        (acc, item) => (acc += item.count),
        0
      );
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
