import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navigation from './components/Navigation'
import Home from './components/Home'
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Detail from './components/Detail';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)

  useEffect(() => {
    const value = window.localStorage.getItem("user");
    console.log(value)
    if (value) {
        setIsSignedIn(true)
    } else {
        setIsSignedIn(false)
    }
})


  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/detail/:id/:type' element={<Detail/>}/>
        <Route
        path="/profile"
        element={
          <ProtectedRoute isSignedIn={isSignedIn}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      </Routes>

      
    </Router>
  );
}

export default App;