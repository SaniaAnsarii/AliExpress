import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of product IDs that are wishlisted - starting empty for testing
  isOpen: false, // For wishlist modal
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(id => id !== productId);
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist, 
  clearWishlist,
  setWishlistModal 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
