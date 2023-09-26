import axios from 'axios';
import { queries } from '../modules/constants';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../modules/useLocalStorage';

const apiUrl = require('../modules/constants').apiUrl;

function Login() {
    const navigate = useNavigate()

    const handleClickLogin = (event) => {
        if (document.getElementById("userId").value === "") {
            document.getElementById("userId").focus()
            alert("Empty email")
        }
        else if (document.getElementById("passwordId").value === "") {
            document.getElementById("passwordId").focus()
            alert("Empty password")
        }
        else if (document.getElementById("passwordId").value.length < 6) {
            document.getElementById("passwordId").focus()
            alert("Password should be at least 6 characters")
        }
        else {
            axios({
                url: 'http://localhost:3001/login',
                method: 'POST',
                data: {
                    mail: document.getElementById("userId").value,
                    password: document.getElementById("passwordId").value
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.res) {
                        window.localStorage.setItem("user", JSON.stringify(res.data.uid))
                        navigate('/')       
                    } else {
                        alert("Data incorrect")    
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    alert("Data incorrect")
                });
        }
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