'use client';

import styles from '@/styles/profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/images/logos/Crowd_Comic_Logo_BW.svg';
import Navbar from '@/components/NavBar';

import { useEffect, useState } from 'react';
import { nameAction, passwordAction } from '@/app/login/actions';
import { getUserBySession, changePfp } from '@/api/apiCalls';
import { getSessionCookie } from '@/app/login/loginUtils';
import { User } from './interfaces';
import ProfilePicture from './ProfilePicture';


export function Profile() {
    const [session_id, setSession] = useState('');
    const [user, setUser] = useState<User>();
    const [message, errorState] = useState('');
    const [displayName, updateName] = useState('Display Name');
    const [email, updateEmail] = useState('email@example.com');
    const [pfp, updatePfp] = useState('/images/icons/Profile.svg');
    const [currentPasswordVisible, setCurrentPasswordVisibility] = useState(false);
    const [newPasswordVisible, setNewPasswordVisibility] = useState(false);
    const [retypePasswordVisible, setRetypePasswordVisibility] = useState(false);
    const [password, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisibility(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisibility(!newPasswordVisible);
    };

    const toggleRetypePasswordVisibility = () => {
        setRetypePasswordVisibility(!retypePasswordVisible);
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
            if(user.profile_picture) updatePfp(user.profile_picture);
        };
        if(!user) getProfileValues();
    });

    return (
        <main className={styles.body}>
            <Navbar />
            <section id={styles.profilePage} className="content">
                <h1 className={`${styles.h1} pt-5 pb-3 px-3`}>Dashboard</h1>
                <div className="mt-5 d-flex flex-fill gap-3 justify-content-center flex-wrap">
                    <form
                        id={styles.loginForm}
                        action={async (formData) => {
                            const response = await nameAction(formData);
                            errorState(response);
                        }}
                    >

                        {/* USERNAME */}
                        <div className={`mb-3 ${styles.formInputs}`}>
                        <label htmlFor="changePfp" className={styles.loginLabel}>Change Profile Picture</label>
                        <input
                            onChange={async e => {
                                if(!e.target.files || !email) return;
                                await changePfp(email, e.target.files[0]);
                                const updatedUser = await getUserBySession(session_id);
                                if(!updatedUser) return;
                                updatePfp(updatedUser.profile_picture);
                                window.history.go(); //TODO: Find more elegant solution than refreshing the page to update navbar
                            }} 
                            type="file" 
                            accept="image/*"
                        ></input>
                        <ProfilePicture pfp={pfp}/>
                        </div>
                        <div className={`mb-3 ${styles.formInputs}`}>
                            <label htmlFor="inputUsername" className={styles.loginLabel}>Display Name</label>
                            <input
                                type="displayname"
                                name="displayName"
                                placeholder={`${displayName}`}
                                className="form-control"
                                id={styles.inputUsername}
                                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter Display Name Here')}
                                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                required
                            />
                        </div>
                        {/* EMAIL */}
                        <div className={`mb-3 ${styles.formInputs}`}>
                            <label htmlFor="inputEmail" className={styles.loginLabel}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder={`${email}`}
                                className="form-control"
                                id={styles.inputEmail}
                                aria-describedby="emailHelp"
                                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter Email Here')}
                                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                required
                                disabled
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" id={styles.saveButton} className="btn btn-primary">Save</button>
                        </div>
                    </form>

                    <form
                        id={styles.passwordForm}
                        action={async (formData) => {
                            const response = await passwordAction(formData);
                            errorState(response);
                            if (response != 'password successfully changed') {
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
                            <div className={`mb-3 ${styles.formInputs}`}>
                                <label htmlFor="inputPassword" className={styles.loginLabel}>Current Password</label>
                                <div className={styles.passwordContainer}>
                                    <input
                                        type={currentPasswordVisible ? 'text' : 'password'}
                                        name="oldPassword"
                                        value={password}
                                        onChange={(e) => setPass(e.target.value)}
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
                                        onClick={toggleCurrentPasswordVisibility}
                                        style={{ backgroundImage: `url(${currentPasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                    />
                                </div>
                            </div>
                            <div className={`mb-3 ${styles.formInputs}`}>
                                <label htmlFor="inputPassword" className={styles.loginLabel}>New Password</label>
                                <div className={styles.passwordContainer}>
                                    <input
                                        type={newPasswordVisible ? 'text' : 'password'}
                                        name="newPassword"
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
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
                                        onClick={toggleNewPasswordVisibility}
                                        style={{ backgroundImage: `url(${newPasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                    />
                                </div>
                            </div>
                            <div className={`mb-3 ${styles.formInputs}`}>
                                <label htmlFor="inputPassword" className={styles.loginLabel}>Retype New Password</label>
                                <div className={styles.passwordContainer}>
                                    <input
                                        type={retypePasswordVisible ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={confPass}
                                        onChange={(e) => setConfPass(e.target.value)}
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
                                        onClick={toggleRetypePasswordVisibility}
                                        style={{ backgroundImage: `url(${retypePasswordVisible ? '/images/icons/draw-icons/eyeopen.svg' : '/images/icons/draw-icons/eyeclose.svg'})` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" id={styles.setPasswordButton} className="btn btn-primary">Set Password</button>
                            <Link href="" replace={true}><button type="button" id={styles.cancelButton} className="btn btn-primary">Cancel</button></Link>
                        </div>

                        {!!message && <p>{message}</p>}

                    </form>
                </div>
                {/* FORM */}

            </section>
        </main>
    );
}

