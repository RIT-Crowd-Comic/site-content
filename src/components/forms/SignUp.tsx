'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { registerAction } from '@/app/login/actions';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function SignUpForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    const handleSubmit = (event: any) => {
        if (!emailValid || !passwordValid) {
            event.preventDefault();
            event.stopPropagation();
        }
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
                        <Image className={styles.loginLogo} src={logo} alt="" />
                    </div>
                </Link>
                {/* FORM */}
                <Form
                    id={styles.loginForm}
                    className="needs-validation"
                    noValidate
                    action={async (FormData) => {
                        const response = await registerAction(FormData);
                        if (response != 'Success') {
                            errorState(response);
                            return;
                        }
                        window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/';
                    }}
                >
                    <h1 className={styles.h1}>Sign Up</h1>
                    {/* USERNAME */}
                    <Row className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label htmlFor="inputUsername" className={styles.loginLabel}>Display Name</Form.Label>
                            <Form.Control
                                type="displayname"
                                name="displayName"
                                placeholder="name"
                                className="form-control"
                                id={styles.inputUsername}
                                required
                            />
                        </Form.Group>
                    </Row>
                    {/* EMAIL */}
                    <Row className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label htmlFor="inputEmail" className={styles.loginLabel}>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                className="form-control"
                                id={styles.inputEmail}
                                isInvalid={!emailValid}
                                aria-describedby="emailHelp"
                                onChange={handleEmailChange}
                                required
                            />
                            <Form.Control.Feedback type='invalid' className={styles.feedback}>
                                Please enter a valid email with "@" and ".".
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {/* PASSWORD */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <label htmlFor="inputPassword" className={styles.loginLabel}>Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="********"
                                className="form-control"
                                id={styles.inputPassword}
                                required
                            />

                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                            />
                        </div>
                        <i className="bi bi-eye-slash" id={styles.togglePassword} />
                    </div>
                    {/* CONFIRM PASSWORD */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <label htmlFor="inputPassword" className={styles.loginLabel}>Confirm Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password2"
                                placeholder="********"
                                className="form-control"
                                id={styles.inputPassword}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                            />
                        </div>
                        <i className="bi bi-eye-slash" id={styles.togglePassword} />
                    </div>

                    {/* REGISTER */}
                    <button type="submit" id={styles.loginButton} className="btn btn-primary">Sign Up</button>

                    {/* LOGIN */}
                    <Link href="sign-in" replace={true}><button type="button" id={styles.registerButton} className="btn btn-primary">Back</button></Link>
                    {!!message && <p>{message}</p>}
                </Form>
            </section>
        </main>
    );
}

