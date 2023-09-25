import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { queries } from '../modules/constants';
import axios from "axios";

const apiUrl = require('../modules/constants').apiUrl;

function Navigation() {
    const [isSignedIn, setIsSignedIn] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        const value = window.localStorage.getItem("user");
        console.log(value)
        if (value) {
            setIsSignedIn(true)
        } else {
            setIsSignedIn(false)
            navigate('/newList')
        }
    })

    const signin = () => {
        navigate('/login')

    }
    const signout = () => {
        localStorage.removeItem("user");
        setIsSignedIn(false)
    }

    return (
        <>
            <div className="container">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Home
                        </Link>
                        
                        <Link className="navbar-brand" to="/profile">
                            ProfilePage
                        </Link>
                        <Link className="navbar-brand" to="/newList">
                            Movies and TV Shows
                        </Link>

                        {isSignedIn ? (
                            <div className="navbar-brand">
                                <button className="btn-danger" onClick={signout}>
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="navbar-brand">
                                <button className="btn-dark" onClick={signin}>
                                    Sign in
                                </button>
                            </div>
                        )}

                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navigation;