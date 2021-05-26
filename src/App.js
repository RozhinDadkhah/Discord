import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './component/sidebar/Sidebar'
import Chat from './component/chat/Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import Login from './component/login/Login';
import { auth } from './firebase'
import { login, logout } from './features/userSlice'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        //the user is logged out
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="app" >
      {user ? (
        <>
          < Sidebar />
          < Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
};

export default App;
