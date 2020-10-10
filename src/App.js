import React, { useEffect } from 'react';
import './App.css';
import Login from './app/components/login/Login';
import { login, logout, selectUser } from './app/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import Messenger from './app/components/Messenger';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        dispatch(logout());
        return;
      }
      
      dispatch(login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName,
      }));
    })
  }, []);

  return (
    <div className="app">
      {user ? <Messenger /> : <Login /> }
    </div>
  );
}

export default App;
