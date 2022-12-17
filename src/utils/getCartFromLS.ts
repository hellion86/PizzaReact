import { CartItem } from '../redux/slices/cartSlice';

export const getCartFromLS = () => {
  const dataCartLS = localStorage.getItem('cart');
  if (dataCartLS) {
    return JSON.parse(dataCartLS) as CartItem[];
  } else {
    return [];
  }
};
