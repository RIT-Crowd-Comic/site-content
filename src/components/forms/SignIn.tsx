'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { loginAction } from '@/app/login/actions';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function SignInForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [validated, setValidated] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    const handleSubmit = (event: any) => {
        if (emailValid === false || passwordValid === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleEmailChange = (e: any) => {
        const { value } = e.target;
        let isValid = value.includes('@') && value.includes('.');  
        setEmailValid(isValid);
    };

    // Handler to validate password input
    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        const isValid = value.length >= 8;
        setPasswordValid(isValid);
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
                    validated={validated}
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
                            <Form.Label className={styles.loginLabel}>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                id={`${styles.inputEmail}`}
                                aria-describedby="emailHelp"
                                required
                                onChange={handleEmailChange}
                                isInvalid={!emailValid}
                                className={`${emailValid ? styles.formControlValid : styles.formControlInvalid}`}
                            />
                                <Form.Control.Feedback type = 'invalid' className={styles.feedback}>
                                    Please enter a valid email with "@" and ".".
                                </Form.Control.Feedback>

                        </Form.Group>
                    </Row>
                    {/* PASSWORD */}
                    <Row className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label className={styles.loginLabel}>Password</Form.Label>
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="********"
                                    id={`${styles.inputPassword}`}
                                    isInvalid={!passwordValid}
                                    required
                                    onChange={handlePasswordChange}
                                    className={`${passwordValid ? styles.formControlValid : styles.formControlInvalid}`}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={togglePasswordVisibility}
                                    style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                />
                                    <Form.Control.Feedback type = 'invalid' className={styles.feedback}>
                                        Password in invalid. Ensure it has at least 8 characters.
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

