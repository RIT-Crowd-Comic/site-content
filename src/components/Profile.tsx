'use client'

import styles from "@/styles/login.module.css"
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logos/Crowd_Comic_Logo_BW.svg";

import { useEffect, useState } from "react";
import { loginAction, nameAction, passwordAction } from '@/app/login/actions';
import { getUserBySession } from "@/api/apiCalls";
import { getSessionCookie } from "@/app/login/loginUtils";


export function Profile()
{
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [displayName, updateName] = useState('Display Name');
    const [email, updateEmail] = useState('email@example.com');

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    }

    useEffect(() => {
        const getProfileValues = async () => {
            const session = await getSessionCookie();
            if(!session) return;
            const user = await getUserBySession(session.value);
            if(!user) return;
            updateName(user.display_name);
            updateEmail(user.email);
        };
        getProfileValues();
    } )

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
            <form id={styles.loginForm}>
            <h1 className={styles.h1}>Dashboard</h1>
            {/* FORM */}
            <form id={styles.loginForm} action={async (formData) => {
                const response = await nameAction(formData);
                if(response != 'Success') {
                    errorState(response);
                    return;
                }
                const newName = formData.get('displayName')?.toString();
                if(newName)updateName(newName);
            }}>
                    
            {/* USERNAME */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputUsername" className={styles.loginLabel}>Display Name</label>
                <input type="displayname"
                name="displayName"
                placeholder={`${displayName}`}
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
                placeholder={`${email}`}
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
            </form>
            {/* FORM */}
            <form id={styles.loginForm} action={async (formData) => {
                const response = await passwordAction(formData);
                if(response != 'Success') {
                    errorState(response);
                    return;
                }
            }}>
            <div className={`${styles.h1} mt-3 mb-3`}>
                <h4>Change Your Password</h4>
            </div>
            {/* PASSWORD */}
            <div className={`mb-3 ${styles.formInputs}`}>
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Current Password</label>
                <div className={styles.passwordContainer}>
                    <input type={passwordVisible ? "text" : "password"}
                    name="oldPassword"
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
                    name="newPassword"
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
                <label htmlFor ="inputPassword" className={styles.loginLabel}>Confirm New Password</label>
                <div className={styles.passwordContainer}>
                    <input type={passwordVisible ? "text" : "password"}
                    name="confirmPassword"
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
            </form></form>
        </section>
        </main>
        );
    }

