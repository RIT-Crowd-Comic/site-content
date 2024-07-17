'use client';

import styles from "@/styles/login.module.css"
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/images/logos/Crowd_Comic_Logo_BW.svg";

export function SignUpForm() {
    return (
        <main className={styles.body}>
        <section id={styles.loginPage}>
            {/* LOGO */}
            <Link href="/">
                <div className={styles.loginImageDiv}>
                    <Image className={styles.loginLogo} src={logo} alt=""></Image> 
                </div>
            </Link>
            
            {/* FORM */}
            <form id={styles.loginForm} className="needs-validation" noValidate>
                <h1 className={styles.h1}>Sign Up</h1>
            {/* USERNAME */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputUsername" className={styles.loginLabel}>Display Name</label>
                <input type="displayname"
                //name=displayname
                placeholder="name"
                className={`form-control`}
                id={styles.inputUsername} 
                required/>
            </div>
            {/* EMAIL */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputEmail" className={styles.loginLabel}>Email Address</label>
                <input type="email" 
                // name="email"
                placeholder="name@example.com"
                className={`form-control`}
                id={styles.inputEmail}
                aria-describedby="emailHelp" 
                required/>
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Password</label>
                <input type="password"
                // name="password"
                placeholder="password"
                className={`form-control`}
                id={styles.inputPassword}
                is-invalid
                required/>
                
                <i className={`bi bi-eye-slash`} id={styles.togglePassword}></i>
            </div>

            {/* REGISTER */}
            <Link href="sign-in"><button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Sign Up</button></Link>

            {/* LOGIN */}
            <button type="submit" id={styles.registerButton} className={`btn btn-primary`}>Sign In</button>
            </form>
        </section>
        </main>
        );
    }
    
