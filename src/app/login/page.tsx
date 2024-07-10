import styles from "@/styles/login.module.css"
import Image from "next/image";

import logo from "../../../public/images/logos/Crowd_Comic_Logo_BW.svg";

const Login = () => {
    return (
        <main className={styles.body}>
        <section id={styles.loginPage}>
            {/* LOGO */}
            <div className={styles.loginImageDiv}>
                <Image className={styles.loginLogo} src={logo} alt=""></Image> 
            </div>
            {/* FORM */}
            <form id={styles.loginForm}>
                <h1 className={styles.h1}>LOGIN</h1>
            {/* USERNAME */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputUsername" className={styles.loginLabel}>Username</label>
                <input type="username" className={`form-control`} id={styles.inputUsername} />
            </div>
            {/* EMAIL */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputEmail" className={styles.loginLabel}>Email address</label>
                <input type="email" className={`form-control`} id={styles.inputEmail} aria-describedby="emailHelp" />
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Password</label>
                <input type="password" className={`form-control`} id={styles.inputPassword} />

                <i className={`bi bi-eye-slash`} id={styles.togglePassword}></i>
            </div>

            {/* REGISTER */}
            <button type="submit" id={styles.registerButton} className={`btn btn-primary`}>Register</button>

            {/* LOGIN */}
            <button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Login</button>
            </form>
        </section>
        </main>
        );
    }
export default Login