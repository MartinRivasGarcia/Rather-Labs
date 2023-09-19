import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


//Usar Axios.post("htpp://localhost:3001/pedido", objeto) puedo usar then o await, si no quiero pasar nada directamente no pongo objeto
import Navigation from './components/Navigation'
import ListGroup from './components/ListGroup'
import Home from './components/Home'
import NewListGroup from './components/NewListGroup';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Detail from './components/Detail';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)

  const signin = () => {
    setIsSignedIn(true)
  }
  const signout = () => {
    setIsSignedIn(false)
  }

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/list' element={<ListGroup/>} />
        <Route path='/newList' element={<NewListGroup/>} />
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

      {isSignedIn ? (
          <div className="d-grid mt-5">
            <button className="btn-danger" onClick={signout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="d-grid mt-5">
            <button className="btn-dark" onClick={signin}>
              Sign in
            </button>
          </div>
        )}

    </Router>
  );
}


export default App;
