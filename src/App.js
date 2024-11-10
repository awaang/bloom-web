import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
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

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <div style={styles.authContainer}>
      <h2 style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <input
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <div style={styles.buttonContainer}>
        <button onClick={handleAuthentication} style={{ backgroundColor: '#3498db', color: '#fff' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
      <div style={styles.bottomContainer}>
        <p style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <div style={styles.authContainer}>
      <h2 style={styles.title}>Welcome</h2>
      <p style={styles.emailText}>{user.email}</p>
      <button onClick={handleAuthentication} style={{ backgroundColor: '#e74c3c', color: '#fff' }}>Logout</button>
    </div>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </div>
  );
};

export default App;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    border: '1px solid #ddd',
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    cursor: 'pointer',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
};
