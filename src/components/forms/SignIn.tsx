'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { loginAction } from '@/app/login/actions';


export function SignInForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    return (
        <main className={styles.body}>
            <section id={styles.loginPage}>
                {/* LOGO */}
                <Link href="/">
                    <div className={styles.loginImageDiv}>
                        <Image className={styles.loginLogo} src={logo} alt="home page" />
                    </div>
                </Link>
                {/* FORM */}
                <form
                    id={styles.loginForm}
                    action={async (formData) => {
                        const response = await loginAction(formData);
                        if (response != 'Success') {
                            errorState(response);
                            return;
                        }
                        window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/';
                    }}
                >
                    <h1 className={styles.h1}>Sign In</h1>
                    {/* EMAIL */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <label htmlFor="inputEmail" className={styles.loginLabel}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            className="form-control"
                            id={styles.inputEmail}
                            aria-describedby="emailHelp"
                            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter Email Here')}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                            required
                        />
                    </div>
                    {/* PASSWORD */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <label htmlFor="inputPassword" className={styles.loginLabel}>Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="********"
                                className="form-control"
                                id={`${styles.inputPassword}`}
                                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter Password Here')}
                                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                            />
                        </div>
                    </div>

                    {/* LOGIN */}
                    <button type="submit" id={styles.loginButton} className="btn btn-primary">Sign In</button>

                    {/* REGISTER */}
                    <Link href="sign-up" replace={true}><button type="button" id={styles.registerButton} className="btn btn-primary">Sign Up</button></Link>
                    {!!message && <p>{message}</p>}
                </form>
            </section>
        </main>
    );
}

