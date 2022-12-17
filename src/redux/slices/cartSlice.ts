import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

const calculateTotalPrice = (items: CartItem[]): number =>
  items.reduce((acc, pizza) => (acc += pizza.count * pizza.price), 0);

const calculateTotalCount = (items: CartItem[]): number =>
  items.reduce((acc, pizza) => (acc += pizza.count), 0);

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
  imageUrl: string;
};

// интерфейс типизирует только объект
// обычно используется для типизирования initialState
interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const dataFromLS = getCartFromLS();

const initialState: CartSliceState = {
  items: dataFromLS,
  totalPrice: calculateTotalPrice(dataFromLS),
  totalCount: calculateTotalCount(dataFromLS),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items = [...state.items, { ...action.payload, count: 1 }];
      }
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count -= 1;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
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
