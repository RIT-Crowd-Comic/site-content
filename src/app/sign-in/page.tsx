"use client"
import {SignInForm} from "@/components/forms/SignIn";
import Notifications from '@/components/toast-notifications/notifications';
import useNotifications from '@/components/toast-notifications/useNotifications';

export default function SignIn()
{
    const {
        toasts,
        addToast,
        removeToast,
    } = useNotifications();
    return (       
    <>
    <Notifications  toasts={toasts}
    onClose={removeToast}/>
    <SignInForm sendToast = {addToast}/>
    </>
    )
}