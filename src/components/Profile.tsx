'use client';

import styles from '@/styles/profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/images/logos/Crowd_Comic_Logo_BW.svg';
import Navbar from '@/components/NavBar';

import { useEffect, useState, useRef } from 'react';
import { nameAction, passwordAction } from '@/app/login/actions';
import { getUserBySession } from '@/api/apiCalls';
import { getSessionCookie } from '@/app/login/loginUtils';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as validation from './forms/utils';
import { User } from './interfaces';
import { ProfileEditor } from './ProfileEditor';
import ProfilePicture from './ProfilePicture';

import { addToastFunction } from './toast-notifications/interfaces';


interface Props {
    sendToast: addToastFunction
}
export function Profile({ sendToast } : Props) {
    const [session_id, setSession] = useState('');
    const [user, setUser] = useState<User>();
    const [message, errorState] = useState('');
    const [displayName, updateName] = useState('Display Name');
    const [email, updateEmail] = useState('email@example.com');
    const [currentPasswordVisible, setCurrentPasswordVisibility] = useState(false);
    const [newPasswordVisible, setNewPasswordVisibility] = useState(false);
    const [retypePasswordVisible, setRetypePasswordVisibility] = useState(false);
    const [password, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [profileEditorState, setProfileEditorState] = useState(false);

    const pfpRef = useRef<string | undefined>('/images/icons/Profile.svg');

    const [emailValid, setEmailValid] = useState(true);
    const [originalPasswordValid, setOriginalPasswordValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordRetypeValid, setPasswordRetypeValid] = useState(true);
    const [displayNameValid, setDisplayNameValid] = useState(true);
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState(Array<string>);
    const [passwordInvalidRetypeMessage, setPasswordInvalidRetypeMessage] = useState('');

    const handleSubmitDisplayEmail = (event: any) => {

        // validate filled fields
        const formData = new FormData(event.target);
        const displayName = formData.get('displayName');

        // const email = formData.get('email')
        if (!displayName) { setDisplayNameValid(false); }

        // if(!email){  setEmailValid(false)};

        if (!emailValid || !displayNameValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleSubmitPassword = (event: any) => {
        const formData = new FormData(event.target);
        const password = formData.get('password');
        const password2 = formData.get('password2');
        const oldPassword = formData.get('oldPassword');
        if (!password) { setPasswordValid(false); }
        if (!password2) { setPasswordRetypeValid(false); }
        if (!oldPassword) { setOriginalPasswordValid(false); }
        if (!passwordValid || !passwordRetypeValid || !originalPasswordValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisibility(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisibility(!newPasswordVisible);
    };

    const toggleRetypePasswordVisibility = () => {
        setRetypePasswordVisibility(!retypePasswordVisible);
    };

    const handleDisplayNameChange = (e: any) => {
        const { value } = e.target;
        setDisplayNameValid(validation.validateDisplayName(value));
    };

    // Handler to validate password input
    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        const errors = validation.validatePassword(value);
        if (value === password) errors.push('New password cannot match old password.');
        setPasswordInvalidMessage(errors);
        setPasswordValid(errors.length === 0);
    };

    const handlePasswordChangeSimpleOriginal = (e: any) => {
        const { value } = e.target;
        setOriginalPasswordValid(validation.validatePasswordSimple(value));

    };

    const handlePasswordChangeSimpleRetype = (e: any) => {
        const { value } = e.target;
        if (value != newPass) { setPasswordRetypeValid(false); setPasswordInvalidRetypeMessage('Passwords must match.'); return; }
        setPasswordRetypeValid(validation.validatePasswordSimple(value));
        setPasswordInvalidRetypeMessage('');
    };

    useEffect(() => {
        const getProfileValues = async () => {
            const session = await getSessionCookie();
            if (!session) return;
            setSession(session.value);
            const user = await getUserBySession(session.value);
            if (!user) return;
            setUser(user);
            updateName(user.display_name);
            updateEmail(user.email);
            if (user.profile_picture) pfpRef.current = user.profile_picture;
        };
        if (!user) getProfileValues();
    });

    return (
        <main className={styles.body}>
            <Navbar p_pfp={pfpRef.current} />
            <section id={styles.profilePage} className="content">
                <h1 className={`${styles.h1} pt-5 pb-3 px-3`}>Dashboard</h1>
                <div className="mt-5 d-flex flex-fill gap-3 justify-content-center flex-wrap">
                    <Form
                        noValidate
                        onSubmit={handleSubmitDisplayEmail}
                        id={styles.loginForm}
                        action={async (formData) => {
                            const response = await nameAction(formData);
                            if (response.includes(`success`))sendToast(response, 'Success', false, 6000, false);
                            else sendToast(response, 'Error', false, 6000, true);
                        }}
                    >


                        {/* USERNAME */}
                        <Row className={`mb-3 ${styles.formInputs}`}>
                            {/* PROFILE PICTURE*/}
                            <div className={`mb-3 ${styles.formInputs}`}>
                                <div id={styles.profileIconContainer} className="m-auto">
                                    <ProfilePicture pfp={pfpRef.current} width={200} height={200} />
                                    <a id={styles.profileIconEdit} onClick={() => setProfileEditorState(!profileEditorState)}> </a>
                                </div>
                            </div>
                        </Row>
                        <Row className={`mb-3 ${styles.formInputs}`}>
                            <Form.Group>
                                <Form.Label htmlFor="inputUsername" className={styles.loginLabel}>Display Name</Form.Label>
                                <Form.Control
                                    type="displayname"
                                    name="displayName"
                                    placeholder={`${displayName}`}
                                    className="form-control"
                                    id={styles.inputUsername}
                                    isInvalid={!displayNameValid}
                                    onChange={handleDisplayNameChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                    Must be between 1 and 30 characters.
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
                                    placeholder={`${email}`}
                                    className="form-control"
                                    id={styles.inputEmail}
                                    aria-describedby="emailHelp"
                                    required
                                    disabled
                                    isInvalid={!emailValid}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                    Email is invalid, must contain a &quot@&quot and a &quot.&quot .
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className={styles.buttonContainer}>
                            <button type="submit" id={styles.saveButton} className="btn btn-primary">Save</button>
                        </div>
                    </Form>

                    <Form
                        id={styles.passwordForm}
                        onSubmit={handleSubmitPassword}
                        noValidate
                        action={async (formData) => {
                            const response = await passwordAction(formData);
                            if (response === 'password successfully changed') sendToast(response, 'Success', false, 6000, false);
                            else {
                                sendToast(response, 'Error', false, 6000, true);
                                return;
                            }
                            setPass('');
                            setNewPass('');
                            setConfPass('');
                        }}
                    >

                        <div className={`${styles.h1} mb-3`}>
                            <h4>Change Your Password</h4>
                        </div>

                        {/* PASSWORD */}
                        <div className="d-flex flex-column align-items-start w-100">
                            <Row className={`mb-3 ${styles.formInputs}`}>
                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword" className={styles.loginLabel}>Current Password</Form.Label>
                                    <div className={styles.passwordContainer}>
                                        <Form.Control
                                            type={currentPasswordVisible ? 'text' : 'password'}
                                            name="oldPassword"
                                            value={password}
                                            onChange={(e) => { setPass(e.target.value); handlePasswordChangeSimpleOriginal(e); }}
                                            placeholder="********"
                                            className="form-control"
                                            isInvalid={!originalPasswordValid}
                                            id={`${styles.inputPassword}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={toggleCurrentPasswordVisibility}
                                            style={{ backgroundImage: `url(${currentPasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                        />
                                        <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                            {}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row className={`mb-3 ${styles.formInputs}`}>
                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword" className={styles.loginLabel}>New Password</Form.Label>
                                    <div className={styles.passwordContainer}>
                                        <Form.Control
                                            type={newPasswordVisible ? 'text' : 'password'}
                                            name="newPassword"
                                            value={newPass}
                                            onChange={(e) => { setNewPass(e.target.value); handlePasswordChange(e); }}
                                            placeholder="********"
                                            className="form-control"
                                            id={`${styles.inputPassword}`}
                                            required
                                            isInvalid={!passwordValid}
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={toggleNewPasswordVisibility}
                                            style={{ backgroundImage: `url(${newPasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
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
                            </Row>
                            <Row className={`mb-3 ${styles.formInputs}`}>
                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword" className={styles.loginLabel}>Retype New Password</Form.Label>
                                    <div className={styles.passwordContainer}>
                                        <Form.Control
                                            type={retypePasswordVisible ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={confPass}
                                            onChange={(e) => { setConfPass(e.target.value); handlePasswordChangeSimpleRetype(e); }}
                                            placeholder="********"
                                            className="form-control"
                                            id={`${styles.inputPassword}`}
                                            isInvalid={!passwordRetypeValid}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={toggleRetypePasswordVisibility}
                                            style={{ backgroundImage: `url(${retypePasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                        />
                                        <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                            {passwordInvalidRetypeMessage}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                            </Row>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" id={styles.setPasswordButton} className="btn btn-primary">Set Password</button>
                            <Link href="" replace={true}><button type="button" id={styles.cancelButton} className="btn btn-primary">Cancel</button></Link>
                        </div>
                    </Form>
                </div>
                {/* FORM */}

            </section>
            <ProfileEditor
                editorState={profileEditorState}
                setEditorState={setProfileEditorState}
                pfpRef={pfpRef}
                email={email}
            />
        </main>
    );
}
