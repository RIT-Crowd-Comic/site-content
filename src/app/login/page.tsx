import "../../styles/login.css";
import Image from "next/image";

import logo from "../../../public/images/logos/Crowd_Comic_Logo_BW.svg";

const Login = () => {
    return (
        <main id="loginPage">
            {/* LOGO */}
            <div className="loginImageDiv">
                <Image className="loginLogo" src={logo} alt=""></Image> 
            </div>
            {/* FORM */}
            <form id="loginForm">
                <h1>LOGIN</h1>
            {/* USERNAME */}
            <div className="mb-3 formInputs">
                <label htmlFor ="inputUsername" className="loginLabel">Username</label>
                <input type="username" className="form-control" id="inputUsername" />
            </div>
            {/* EMAIL */}
            <div className="mb-3 formInputs">
                <label htmlFor ="inputEmail" className="loginLabel">Email address</label>
                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            {/* PASSWORD */}
            <div className="mb-3 formInputs">
                <label htmlFor ="inputPassword" className="loginLabel">Password</label>
                <input type="password" className="form-control" id="inputPassword" />

                <i className="bi bi-eye-slash" id="togglePassword"></i>
            </div>

            {/* REGISTER */}
            <button type="submit" id="registerButton" className="btn btn-primary">Register</button>

            {/* LOGIN */}
            <button type="submit" id="loginButton" className="btn btn-primary">Login</button>
            </form>
        </main>
        );
    }
export default Login