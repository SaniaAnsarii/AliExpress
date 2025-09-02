'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import { fetchCart } from './features/cart/cartSlice';
import { fetchWishlist } from './features/wishlist/wishlistSlice';

function AuthListener({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for stored authentication token and validate with backend
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Validate token with backend and set user
      // For now, we'll just clear any stored token
      localStorage.removeItem('authToken');
      dispatch(setUser(null));
    }
  }, [dispatch]);

  // Load cart and wishlist when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const removeDevIndicator = () => {
      const indicator = document.getElementById('devtools-indicator');
      if (indicator) {
        indicator.remove();
      }
      
      const toasts = document.querySelectorAll('.nextjs-toast');
      toasts.forEach(toast => toast.remove());
    };

    removeDevIndicator();
    
    const timer = setTimeout(removeDevIndicator, 100);
    
    const observer = new MutationObserver(removeDevIndicator);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return children;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthListener>
        {children}
      </AuthListener>
    </Provider>
  );
}
