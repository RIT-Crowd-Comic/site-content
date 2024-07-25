'use server';

import { cookies } from 'next/headers';
import {
    insertSession, getUserBySession, authenticate, createUser,
    changeDisplayName,
    changePassword
} from '@/api/apiCalls';

const expireDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

/**
 * Insert the session into the data base and save the session id in a cookie
 * @param user_id User to save a session for
 */
const saveSession = async (user_id: string) => {
    const session = await insertSession(user_id);
    const sessionId = session.id;
    if (!sessionId) return 'Failed to sign in';
    cookies().set('session', sessionId, { expires: expireDate, httpOnly: true });
};

/**
 * Refresh expiry date of a session
 * @param request 
 * @returns 
 */
const updateSession = async (session_id: string) => {
    const newExpiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session_id, { expires: newExpiration, httpOnly: true });
};

/**
 * Check for cookie session then session in DB. Get user from session data
 * @returns Session user
 */
const authenticateSession = async () => {
    const session = getSessionCookie();
    if (!session) return new Error('No user session found');
    const user = await getUserBySession(session.value);
    if (!user) return new Error('No user found for session');
    if (user instanceof Error) return user;

    // Refresh the session expiry
    // await updateSession(session_id);
    return user;
};

/**
 * Login user and create a session for them
 * @param email User's email 
 * @param password User's password
 * @returns 
 */
const login = async (email: string, password: string) => {
    const user = await authenticate(email, password);

    // If user is an error, return that error and don't redirect
    if (!user || user.message) return user.message;
    await saveSession(user.id);
    return 'Success';
};

/**
 * Create a user and sign them in
 * @param email user email (needs to be unique)
 * @param displayName user display name
 * @param password user password
 * @returns 
 */
const register = async (email: string, displayName: string, password: string) => {
    const user = await createUser(email, displayName, password);

    // If user is an error, return that error and don't redirect
    if (!user || user instanceof Error) return user;

    // Successful sign-up wil sign-in the user
    await login(email, password);
    return 'Success';
};

/**
 * Delete the session cookie to cause a logout
 */
const logout = async () => {
    cookies().set('session', '', { expires: new Date(0) });
};

const getSessionCookie = () =>{
    return cookies().get('session');
};

const updateDisplayName = async (newName: string) => {
    const session = getSessionCookie();
    if(!session || session instanceof Error) return session;
    const user = await getUserBySession(session.value);
    if(!user || user instanceof Error) return user;
    return await changeDisplayName(user.email, user.password, newName);
};

const updatePassword = async (oldPassword: string, newPassword: string, passwordConfirm: string) => {
    if(newPassword!=passwordConfirm) return 'Password Confirmation must match new password';
    const session = getSessionCookie();
    if(!session || session instanceof Error) return session;
    const user = await getUserBySession(session.value);
    if(!user || user instanceof Error) return user;
    return await changePassword(user.email, oldPassword, newPassword);
}

export {
    authenticateSession, login, register, logout, getSessionCookie, updateSession, updateDisplayName, updatePassword
};
