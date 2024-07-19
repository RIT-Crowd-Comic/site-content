'use client'

import styles from "@/styles/login.module.css"
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/images/logos/Crowd_Comic_Logo_BW.svg";

import { useState } from "react";
import {loginAction, testAuth} from '@/app/login/actions';

//const forms = document.querySelectorAll('.needs-validation')

// Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event =>
//     {
//         if (!form.checkValidity())
//     }
// })

// const togglePassword = document.querySelector('#togglePassword');
// const password = document.querySelector('#inputPassword');

// togglePassword?.addEventListener('click', () => {
//     const type = password?.getAttribute('type') === 'password' ?
//     'text' : 'password';
//     password?.setAttribute('type', type);
//     togglePassword.classList.toggle('bi-eye');
// })

export function SignInForm()
{
    const [message, errorState] = useState('');

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
            <form id={styles.loginForm} action={async (formData) => {
                    const response = await loginAction(formData);
                    if(response!='Success') errorState(response);
                }} >
                <h1 className={styles.h1}>Sign In</h1>
            {/* EMAIL */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputEmail" className={styles.loginLabel}>Email Address</label>
                <input type="email" 
                name="email"
                placeholder="name@example.com"
                className={`form-control`}
                id={styles.inputEmail}
                aria-describedby="emailHelp" 
                onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Email Here')}
                onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                required/>
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Password</label>
                <input type="password"
                name="password"
                placeholder="password"
                className={`form-control`}
                id={`${styles.inputPassword}`}
                onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Password Here')}
                onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                required/>

                <i className={`bi bi-eye-slash`} id={`${styles.togglePassword} togglePassword`}></i>
            </div>

            {/* LOGIN */}
            <button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Sign In</button>

            {/* REGISTER */}
            <Link href="sign-up"><button type="button" id={styles.registerButton} className={`btn btn-primary`}>Sign Up</button></Link>
            {!!message && <p>{message}</p>}
            </form>
            {/* FORM TO TEST authenticateSession <form action={testAuth}><button type="submit">Authenticate</button></form> */}
        </section>
        </main>
        );
    }

