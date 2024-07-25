'use client'

import styles from "@/styles/login.module.css"
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logos/Crowd_Comic_Logo_BW.svg";

import { useState } from "react";
import { loginAction } from '@/app/login/actions';


export function Profile()
{
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    }

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
                    if(response != 'Success') {
                        errorState(response);
                        return;
                    }
                    window.history.go(-1);
                }} >
                <h1 className={styles.h1}>Dashboard</h1>
                {/* USERNAME */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputUsername" className={styles.loginLabel}>Display Name</label>
                <input type="displayname"
                name="displayName"
                placeholder="name"
                className="form-control"
                id={styles.inputUsername} 
                onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Display Name Here')}
                onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                required/>
            </div>
            {/* EMAIL */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputEmail" className={styles.loginLabel}>Email Address</label>
                <input type="email" 
                name="email"
                placeholder="name@example.com"
                className="form-control"
                id={styles.inputEmail}
                aria-describedby="emailHelp" 
                onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Email Here')}
                onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                required
                disabled/>
            </div>

            <button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Save Changes</button>
            <Link href="sign-up" replace={true}><button type="button" id={styles.registerButton} className={`btn btn-primary`}>Reset Values</button></Link>

            <div className={`${styles.h1} mt-3 mb-3`}>
                <h4>Change Your Password</h4>
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Current Password</label>
                <div className={styles.passwordContainer}>
                    <input type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className={`form-control`}
                    id={`${styles.inputPassword}`}
                    onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Password Here')}
                    onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                    required/>
                    <button type="button"
                    className={styles.togglePassword}
                    onClick={togglePasswordVisibility}
                    style={{
                        backgroundImage: `url(${passwordVisible ? "/images/icons/draw-icons/eyeopen.svg" : "/images/icons/draw-icons/eyeclose.svg"})`
                    }}
                    >
                    </button>
                </div>
            </div>
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>New Password</label>
                <div className={styles.passwordContainer}>
                    <input type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className={`form-control`}
                    id={`${styles.inputPassword}`}
                    onInvalid = {e => (e.target as HTMLInputElement).setCustomValidity('Enter Password Here')}
                    onInput = {e => (e.target as HTMLInputElement).setCustomValidity('')}
                    required/>
                    <button type="button"
                    className={styles.togglePassword}
                    onClick={togglePasswordVisibility}
                    style={{
                        backgroundImage: `url(${passwordVisible ? "/images/icons/draw-icons/eyeopen.svg" : "/images/icons/draw-icons/eyeclose.svg"})`
                    }}
                    >
                    </button>
                </div>
            </div>

            {/* LOGIN */}
            <button type="submit" id={styles.loginButton} className={`btn btn-primary`}>Set New Password</button>

            {/* REGISTER */}
            <Link href="sign-up" replace={true}><button type="button" id={styles.registerButton} className={`btn btn-primary`}>Cancel</button></Link>
            {!!message && <p>{message}</p>}
            </form>
        </section>
        </main>
        );
    }

