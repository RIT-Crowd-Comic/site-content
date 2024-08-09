'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { registerAction } from '@/app/login/actions';
import Form from 'react-bootstrap/Form';
import { FormLabel } from 'react-bootstrap';
import * as validation from './utils';
import { addToastFunction } from '../toast-notifications/interfaces';


interface Props {
    sendToast: addToastFunction
}
export function SignUpForm({ sendToast } : Props) {
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [emailValidMessage, setemailValidMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordRetypeValid, setPasswordRetypeValid] = useState(true);
    const [displayNameValid, setDisplayNameValid] = useState(true);
    const [displayNameValidMessage, setDisplayNameValidMessage] = useState('');
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState(Array<string>);
    const [passwordInvalidRetypeMessage, setPasswordInvalidRetypeMessage] = useState('');
    const [password, setPass] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisible);
    };

    const handleSubmit = (event: any) => {

        // validate filled fields
        const formData = new FormData(event.target);
        const displayName = formData.get('displayName');
        const email = formData.get('email');
        const password = formData.get('password');
        const password2 = formData.get('password2');
        if (!displayName) { setDisplayNameValid(false); }
        if (!email) { setEmailValid(false); }
        if (!password) { setPasswordValid(false); }
        if (!password2) { setPasswordRetypeValid(false); }

        if (!emailValid || !passwordValid || !displayNameValid || !passwordRetypeValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmailValid(validation.validateEmail(value));
        setemailValidMessage(`Please enter a valid email with "@" and "." .`);
    };
    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDisplayNameValid(validation.validateDisplayName(value));
        setDisplayNameValidMessage('Display name must be between 1 and 30 characters.');
    };
    const handlepasswordRetypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value != password) { setPasswordInvalidRetypeMessage('Password must match.'); setPasswordRetypeValid(false); return; }
        setPasswordRetypeValid(validation.validatePasswordSimple(value)); // check between 1-30 same as display 
        setPasswordInvalidRetypeMessage('');
    };

    // Handler to validate password input
    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        const errors = validation.validatePassword(value);

        setPasswordValid(errors.length === 0);
        setPasswordInvalidMessage(errors);
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
                    onSubmit={handleSubmit}
                    id={styles.loginForm}
                    className="needs-validation"
                    noValidate
                    action={async (FormData) => {
                        const response = await registerAction(FormData);
                        if (response != 'Success') {
                            sendToast(response, 'Error', false, 6000, true);
                            return;
                        }
                        setPass('');
                        window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/';
                    }}
                >
                    <h1 className={styles.h1}>Sign Up</h1>
                    {/* USERNAME */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <Form.Label htmlFor="inputUsername" className={styles.loginLabel}>Display Name</Form.Label>
                            <Form.Control
                                type="displayname"
                                name="displayName"
                                placeholder="name"
                                className="form-control"
                                id={styles.inputUsername}
                                required
                                isInvalid={!displayNameValid}
                                onChange={handleDisplayNameChange}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                {displayNameValidMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    {/* EMAIL */}
                    <div className={`mb-3 ${styles.formInputs}`}>
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
                            <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                {emailValidMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    {/* PASSWORD */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <FormLabel htmlFor="inputPassword" className={styles.loginLabel}>Password</FormLabel>
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="********"
                                    className="form-control"
                                    id={styles.inputPassword}
                                    required
                                    isInvalid={!passwordValid}
                                    onChange={(e) => { setPass(e.target.value); handlePasswordChange(e); }}
                                />

                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={togglePasswordVisibility}
                                    style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                    <ul>
                                        {passwordInvalidMessage.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                    </div>
                    {/* CONFIRM PASSWORD */}
                    <div className={`mb-3 ${styles.formInputs}`}>
                        <Form.Group>
                            <FormLabel htmlFor="inputPassword" className={styles.loginLabel}>Confirm Password</FormLabel>
                            <div className={styles.passwordContainer}>
                                <Form.Control
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password2"
                                    placeholder="********"
                                    className="form-control"
                                    id={styles.inputPassword}
                                    required
                                    isInvalid={!passwordRetypeValid}
                                    onChange={handlepasswordRetypeChange}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ backgroundImage: `url(${confirmPasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                    {passwordInvalidRetypeMessage}
                                </Form.Control.Feedback>
                            </div>
                            <i className="bi bi-eye-slash" id={styles.togglePassword} />
                        </Form.Group>
                    </div>

                    {/* REGISTER */}
                    <button type="submit" id={styles.loginButton} className="btn btn-primary">Sign Up</button>

                    {/* LOGIN */}
                    <Link href="sign-in" replace={true}><button type="button" id={styles.registerButton} className="btn btn-primary">Back</button></Link>
                </Form>
            </section>
        </main>
    );
}

