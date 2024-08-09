'use client';
import { Profile } from '@/components/Profile';
import Notifications from '@/components/toast-notifications/notifications';
import useNotifications from '@/components/toast-notifications/useNotifications';

export default function ProfilePage() {
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
            <Profile sendToast={addToast} />
        </>
    );
}
