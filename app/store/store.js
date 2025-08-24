import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from Firebase auth
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'auth/signUp/fulfilled',
          'auth/signIn/fulfilled',
          'auth/setUser'
        ],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

// Export types for use in components (JavaScript style)
export const getState = store.getState;
export const dispatch = store.dispatch;
