'use client';
import { SignUpForm } from '@/components/forms/SignUp';
import Notifications from '@/components/toast-notifications/notifications';
import useNotifications from '@/components/toast-notifications/useNotifications';


export default function SignUp() {
    const {
        toasts,
        addToast,
        removeToast,
    } = useNotifications();

    return (
        <>
            <Notifications
                toasts={toasts}
                onClose={removeToast}
            />
            <SignUpForm sendToast={addToast} />
        </>

    );
}
