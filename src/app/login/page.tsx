//'use client';
import styles from "@/styles/login.module.css"
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/images/logos/Crowd_Comic_Logo_BW.svg";

import { loginAction, testAuth } from "./actions";



const Login = () => {
    return (
        <main className={styles.body}>
        <section id={styles.loginPage}>
            {/* LOGO */}
            <div className={styles.loginImageDiv}>
                <Image className={styles.loginLogo} src={logo} alt=""></Image> 
            </div>
            {/* FORM */}
            <form action={loginAction} id={styles.loginForm}>
                <h1 className={styles.h1}>LOGIN</h1>
            {/* EMAIL */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputEmail" className={styles.loginLabel}>Email Address</label>
                <input type="email" name="email" className={`form-control`} id={styles.inputEmail} aria-describedby="emailHelp" />
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Password</label>
                <input type="password" name="password" className={`form-control`} id={styles.inputPassword} />

                <i className={`bi bi-eye-slash`} id={styles.togglePassword}></i>
            </div>

            {/* REGISTER */}
            <Link href="/register/"><button type="button" id={styles.registerButton} className={`btn btn-primary`}>Create Account</button></Link>

            {/* LOGIN */}
            <button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Login</button>
            </form>
            <form action={testAuth}><button type="submit">Authenticate</button></form>
        </section>
        </main>
        );
    }
export default Login