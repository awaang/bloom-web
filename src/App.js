// App.js

import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from '@firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@firebase/auth';
import { CSpinner } from '@coreui/react';
import './scss/style.scss';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHBGaiDLhUj2VUNG-6_279qakU5JUV5tY",
  authDomain: "bloom-4317b.firebaseapp.com",
  projectId: "bloom-4317b",
  storageBucket: "bloom-4317b.firebasestorage.app",
  messagingSenderId: "164159650573",
  appId: "1:164159650573:web:574b373177b6afc260ce44",
  measurementId: "G-96M7PD38B1"
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

import { auth } from './backend/firebase';

// Lazy-loaded components
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const [user, setUser] = useState(null); // Authentication state
  const [authChecked, setAuthChecked] = useState(false); // Ensure auth state is checked before rendering

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    // Show a loading spinner while checking auth state
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    );
  }

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login auth={auth} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register auth={auth} />}
          />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route
            path="/*"
            element={
              user ? (
                <DefaultLayout auth={auth} user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
