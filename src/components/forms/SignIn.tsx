'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { loginAction } from '@/app/login/actions';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as validation from './utils';

export function SignInForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [validated, setValidated] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    const handleSubmit = (event: any) => {
        if (!emailValid || !passwordValid) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmailValid(validation.validateEmail(value));
    };

    // Handler to validate password input
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordValid(validation.validatePasswordSimple(value));
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
                <Form
                    noValidate
                    onSubmit={handleSubmit}
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
                    <Row className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label  htmlFor="inputEmail" className={styles.loginLabel}>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                id={`${styles.inputEmail}`}
                                aria-describedby="emailHelp"
                                required
                                onChange={handleEmailChange}
                                isInvalid={validated && !emailValid }         
                            />
                                <Form.Control.Feedback type = 'invalid' className={styles.feedback}>
                                    {`Please enter a valid email with "@" and ".".`}
                                </Form.Control.Feedback>

                        </Form.Group>
                    </Row>
                    {/* PASSWORD */}
                    <Row className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label htmlFor="inputPassword" className={styles.loginLabel}>Password</Form.Label>
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="********"
                                    id={`${styles.inputPassword}`}
                                    isInvalid={ validated && !passwordValid}
                                    required
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={togglePasswordVisibility}
                                    style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                />
                                    <Form.Control.Feedback type = 'invalid' className={styles.feedback}>
                                        Password in invalid. Ensure it is between 8 and 30 characters.
                                    </Form.Control.Feedback>
                            </div>

                        </Form.Group>
                    </Row>
                    {/* LOGIN */}
                    <button type="submit" id={styles.loginButton} className="btn btn-primary">Sign In</button>

                    {/* REGISTER */}
                    <Link href="sign-up" replace={true}><button type="button" id={styles.registerButton} className="btn btn-primary">Sign Up</button></Link>
                    <div>{message}</div>
                </Form>
            </section>
        </main>
    );
}

