'use client';

import styles from '@/styles/login.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/logos/Crowd_Comic_Logo_BW.svg';

import { useState } from 'react';
import { registerAction } from '@/app/login/actions';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormLabel } from 'react-bootstrap';

export function SignUpForm() {
    const [message, errorState] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordRetypeValid, setPasswordRetypeValid] = useState(true);
    const [displayNameValid, setDisplayNameValid] = useState(true);
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState(Array<String>);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisible);
    };

    const handleSubmit = (event: any) => {
        if (!emailValid || !passwordValid || !displayNameValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target; 
        setEmailValid(value.includes('@') && value.includes('.'));
    };
    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDisplayNameValid(value.length >= 1 && value.length <= 30);
    };
    const handlepasswordRetypeChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordRetypeValid(value.length >= 1 && value.length <= 30);
    };

    // Handler to validate password input
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const errors: string[] = [];

        if (value.length > 30) {
            errors.push('Password must be 30 characters or less.');
        }
        if (value.length < 8) {
            errors.push('Password must be 8 characters or more.');
        }

        if (!/[a-z]/.test(value)) {
            errors.push('Password must contain at least one lowercase letter.');
        }

        if (!/[A-Z]/.test(value)) {
            errors.push('Password must contain at least one uppercase letter.');
        }

        if (!/[!@#$%^&*()_+\[\]{};':"\\|,.<>/?]/.test(value)) {
            errors.push('Password must contain at least one special character.');
        }

        if (/\s/.test(value)) {
            errors.push('Password must not contain spaces.');
        }

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
                                isInvalid = {!displayNameValid}
                                onChange={handleDisplayNameChange}
                            />
                            <Form.Control.Feedback type='invalid' className={styles.feedback}>
                               Display name must be between 1 and 30 characters.
                            </Form.Control.Feedback>
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
                    <Row className={`mb-3 ${styles.formInputs}`}>
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
                                onChange={handlePasswordChange}
                            />

                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                            />
                                <Form.Control.Feedback type='invalid' className={styles.feedback}>
                                    {<ul>
                                        {passwordInvalidMessage.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>}
                                </Form.Control.Feedback>
                        </div>
                        </Form.Group>
                    </Row>
                    {/* CONFIRM PASSWORD */}
                    <Row className={`mb-3 ${styles.formInputs}`}>
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
                                isInvalid={!passwordRetypeValid || !passwordValid}
                                onChange={handlepasswordRetypeChange}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={togglePasswordVisibility}
                                style={{ backgroundImage: `url(${passwordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                            />
                        </div>
                        <i className="bi bi-eye-slash" id={styles.togglePassword} />
                        </Form.Group>
                    </Row>

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

