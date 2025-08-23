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
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
