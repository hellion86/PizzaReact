import { createSlice } from '@reduxjs/toolkit';

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
    // addItem: (state, action) => {
    //   state.items = [...state.items, action.payload];
    //   state.totalPrice = state.items.reduce(
    //     (acc, item) => (acc += item.price),
    //     0
    //   );
    // },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totaCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

const or1 = {
  id: 0,
  count: 0,
  price: 450,
  diameter: 26,
  thick: 'tonkoe',
  name: 'margarita',
};
