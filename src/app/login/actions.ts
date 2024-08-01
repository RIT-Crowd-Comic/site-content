'use server';

import * as loginUtils from './loginUtils';

const loginAction = async (formData: FormData) => {
    const rawFormData = {
        email:    formData.get('email'),
        password: formData.get('password')
    };
    if (!rawFormData.email) return 'Please enter email';
    if (!rawFormData.password) return 'Please enter password';
    return await loginUtils.login(rawFormData.email.toString(), rawFormData.password.toString());
};

const registerAction = async (formData: FormData) => {
    const rawFormData = {
        displayName: formData.get('displayName'),
        email:       formData.get('email'),
        password:    formData.get('password')
    };
    if (!(rawFormData.displayName && rawFormData.email && rawFormData.password)) return 'Please fill all fields';
    const response = await loginUtils.register(rawFormData.email.toString(), rawFormData.displayName.toString(), rawFormData.password.toString());
    if (!response || response instanceof Error) return response.message;
    return 'Success';
};

const nameAction = async (formData: FormData) => {
    const rawFormData = { displayName: formData.get('displayName') };
    if (!rawFormData.displayName) return 'Please fill all fields';
    const response = await loginUtils.updateDisplayName(rawFormData.displayName.toString());
    if (!response || response instanceof Error) return response.message;
    return 'Success';
};

const passwordAction = async (formData: FormData) => {
    const rawFormData = {
        oldPassword:     formData.get('oldPassword'),
        newPassword:     formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword')
    };
    if (!rawFormData.oldPassword || !rawFormData.newPassword || !rawFormData.confirmPassword) return 'Please fill all fields';
    const response = await loginUtils.updatePassword(rawFormData.oldPassword.toString(), rawFormData.newPassword.toString(), rawFormData.confirmPassword.toString());
    if (!response || response instanceof Error) return response.message;
    return 'Success';
};

export {
    loginAction, registerAction, nameAction, passwordAction
};
