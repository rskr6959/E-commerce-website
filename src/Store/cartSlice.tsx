import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalCost: number;
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem('cartItems') || '[]'),
  totalCost: parseFloat(sessionStorage.getItem('totalCost') || '0')
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalCost += action.payload.price;

      sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      sessionStorage.setItem('totalCost', JSON.stringify(state.totalCost));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index > -1) {
        state.totalCost -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }

      sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      sessionStorage.setItem('totalCost', JSON.stringify(state.totalCost));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const difference = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalCost += difference * item.price;
      }

      sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      sessionStorage.setItem('totalCost', JSON.stringify(state.totalCost));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCost = 0;

      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('totalCost');
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
