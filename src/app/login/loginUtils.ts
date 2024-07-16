import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {redirect} from "next/navigation";
import { insertSession, getSession, getUser, authenticate, createUser } from "@/api/apiCalls";

const secretKey = 'monkey';
const key = new TextEncoder().encode(secretKey);

const expireDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //1 week

/**
 * Encode a payload 
 * @param payload 
 * @returns 
 */
const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 week from now')
        .sign(key);
};

/**
 * Decrypt a value
 * @param input 
 * @returns 
 */
const decrypt = async (input: string) : Promise<any> => {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload;
};

/**
 * Insert the session into the data base and save the session id in a cookie
 * @param user_id User to save a session for
 */
const saveSession = async (user_id: string) => {
    const session = await insertSession(user_id);
    let sessionId = session.session_id;
    sessionId = await encrypt({sessionId, expireDate});
    cookies().set('session', sessionId, {expires: expireDate, httpOnly: true});
};

/**
 * Refresh expiry date of a session
 * @param request 
 * @returns 
 */
const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const response = NextResponse.next();
    response.cookies.set('session', await encrypt(parsed), {expires: parsed.expires, httpOnly: true});
    return response;
};

/**
 * Check for cookie session then session in DB. Get user from session data
 * @returns Session user
 */
const authenticateSession = async () => {
    const session = cookies().get('session');
    if(!session) redirect('/login'); //TODO save where redirecting from
    const dbSession = await getSession(await decrypt(session.value));
    if(!dbSession) redirect('/login');
    return await getUser(dbSession.user_id);
};

/**
 * Login user and create a session for them
 * @param email User's email 
 * @param password User's password
 * @returns 
 */
const login = async (email: string, password: string) => {
    const user = await authenticate(email, password);
    if(!user) 'Incorrect username or password';
    return await saveSession(user.id);
};

/**
 * Create a user and redirect to login
 * @param email user email (needs to be unique)
 * @param displayName user display name
 * @param password user password
 * @returns 
 */
const register = async (email: string, displayName: string, password: string) => {
    const user = await createUser(email, displayName, password);
    //If user is an error, return that error and don't redirect
    if(!user || user instanceof Error) return user;
    redirect('/login');
};

/**
 * Delete the session cookie to cause a logout
 */
const logout = async () => {
    cookies().set('session', '', {expires: new Date(0)});
}

export {authenticateSession, login, register, logout};