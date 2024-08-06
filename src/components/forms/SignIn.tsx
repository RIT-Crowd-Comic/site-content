'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { loginAction } from '@/app/login/actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function SignInForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [validated, setValidated] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [emailValidMessage, setEmailValidMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordValidMessage, setPasswordValidMessage] = useState('');

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
        const isValid = value.includes('@') &&  value.includes('.');
        const message = 'Invalid email.';
        setEmailValidMessage(message)
        console.log(isValid)
        setEmailValid(isValid);
        setValidated(true);
    };

    // Handler to validate password input
    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        console.log(value)
        const isValid = value.length >= 6;
        console.log(isValid)
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
                                className={`${emailValid ? styles.formControlValid : styles.formControlInvalid}`}
                            />
                            {!emailValid && (
                                <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                    {emailValidMessage}
                                </Form.Control.Feedback>
                            )}
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
                                {!passwordValid && (
                                    <Form.Control.Feedback className={styles.feedback}>
                                        Password must be at least 8 characters and contain an uppercase letter.
                                    </Form.Control.Feedback>
                                )}
                            </div>

                        </Form.Group>
                    </Row>
                    {/* LOGIN */}
                    <button type="submit" id={styles.loginButton} className="btn btn-primary">Sign In</button>

                    {/* REGISTER */}
                    <Link href="sign-up" replace={true}><button type="button" id={styles.registerButton} className="btn btn-primary">Sign Up</button></Link>
                </Form>
            </section>
        </main>
    );
}

