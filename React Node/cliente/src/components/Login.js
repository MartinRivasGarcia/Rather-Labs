import axios from 'axios';
import { queries } from '../modules/constants';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../modules/useLocalStorage';

const apiUrl = require('../modules/constants').apiUrl;

function Login() {
    const navigate = useNavigate()

    const handleClickLogin = (event) => {
        console.log(event.target)

        axios({
            url: 'http://localhost:3001/login',
            method: 'POST',
            data: {
                email: document.getElementById("userId").value,
                password: document.getElementById("passwordId").value
            }
        })
            .then(res => {
                console.log(res.data);
                window.localStorage.setItem("user", JSON.stringify(res.data.uid))
                navigate('/newList')
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    const handleClickRegister = (event) => {
        navigate('/register')
    }

    return (
        <>
            <form className="container-sm">
                <div className="mb-3 form-group">
                    <h2>Login</h2>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="userId" className="form-label">Email</label>
                    <input type="text" className="form-control" id="userId" name="usuario" placeholder="Enter your email" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="passwordId" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordId" placeholder="Password" />
                </div>
                <div className="row justify-content-evenly">
                    <input type="button" className="btn btn-primary col-4" value="Sign In" onClick={handleClickLogin} />
                    <input type="button" className="btn btn-primary col-4" value="Register" onClick={handleClickRegister} />
                </div>
            </form>
        </>
    );
}

export default Login;