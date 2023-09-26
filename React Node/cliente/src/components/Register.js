import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()

    const handleClick = (event) => {
        console.log(event.target)

        if (document.getElementById("emailId").value === "") {
            document.getElementById("emailId").focus()
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
        else if (document.getElementById("userId").value === "") {
            document.getElementById("userId").focus()
            alert("Empty user")
        } else {
            axios({
                url: 'http://localhost:3001/register',
                method: 'post',
                data: {
                    email: document.getElementById("emailId").value,
                    password: document.getElementById("passwordId").value,
                    name: document.getElementById("userId").value,
                }
            })
                .then(res => {
                    console.log(res.data);
                    window.localStorage.setItem("user", JSON.stringify(res.data.uid))
                    navigate('/');
                })
                .catch(err => {
                    console.log(err.message);
                });
        }


    }

    return (
        <>
            <form className="container-sm">
                <div className="mb-3 form-group">
                    <h2>Register</h2>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="emailId" className="form-label">Usuario</label>
                    <input type="text" className="form-control" required id="emailId" name="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="userId" className="form-label">Usuario</label>
                    <input type="text" className="form-control" required id="userId" name="user" placeholder="Enter your user" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="passwordId" className="form-label">Password</label>
                    <input type="password" className="form-control" required id="passwordId" placeholder="Password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="button" className="btn btn-primary" value="Register" onClick={handleClick} />
                </div>
            </form>
        </>
    );
}

export default Register;