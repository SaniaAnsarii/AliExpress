'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './features/auth/authSlice';

function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Serialize user data to ensure Redux compatibility
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Remove Next.js development indicator
  useEffect(() => {
    const removeDevIndicator = () => {
      const indicator = document.getElementById('devtools-indicator');
      if (indicator) {
        indicator.remove();
      }
      
      // Also remove any elements with nextjs-toast class
      const toasts = document.querySelectorAll('.nextjs-toast');
      toasts.forEach(toast => toast.remove());
    };

    // Remove immediately
    removeDevIndicator();
    
    // Also remove after a short delay to catch any that are added later
    const timer = setTimeout(removeDevIndicator, 100);
    
    // Set up a mutation observer to catch any that are added dynamically
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
