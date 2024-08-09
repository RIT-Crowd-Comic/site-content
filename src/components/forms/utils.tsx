const validateDisplayName = (displayName : string | undefined)=>{
    if (!displayName) return false;
    return (displayName.length >= 1 && displayName.length <= 30);
};

const validateEmail = (email : string | undefined)=>{
    if (!email) return false;
    return (email.includes('@') && email.includes('.'));
};

/**
 * 
 * @param password returns a array of errors, if array is empty password validated
 * @returns 
 */
const validatePassword = (password : string | undefined)=>{
    const errors: string[] = [];

    if (!password) { errors.push('Password is Required'); return errors; }
    if (password.length > 30) {
        errors.push('Password must be 30 characters or less.');
    }
    if (password.length < 8) {
        errors.push('Password must be 8 characters or more.');
    }

    if (!(/[a-z]/).test(password)) {
        errors.push('Password must contain at least one lowercase letter.');
    }

    if (!(/[A-Z]/).test(password)) {
        errors.push('Password must contain at least one uppercase letter.');
    }

    if (!(/[\d!@#$%^&*()\-=_+[\]{}]/).test(password)) {
        errors.push('Password must contain at least one special character or number.');
    }

    if ((/\s/).test(password)) {
        errors.push('Password must not contain spaces.');
    }
    return errors;
};

const validatePasswordSimple = (password : string | undefined)=>{
    if (!password) return false;
    return (password.length <= 30 && password.length >= 8);
};
export {
    validateEmail, validateDisplayName, validatePassword, validatePasswordSimple
};
