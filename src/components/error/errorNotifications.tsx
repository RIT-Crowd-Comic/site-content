import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import styles from './errorNotifications.module.css';

interface ToastData {
    id: number;
    message: string;
    title: string;
    delay?: number;
    animation?: boolean;
}

interface ErrorNotificationProps {
    toasts: ToastData[];
    onClose: (id: number) => void;
}

/**
 * Dynamic toast amount, they delete on close. Setup in the useErrorNotifications
 * @returns 
 */
const ErrorNotification: React.FC<ErrorNotificationProps> = ({ toasts, onClose }) => {
    return (
        <ToastContainer className={styles.toastContainer} position="bottom-center">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    onClose={() => onClose(toast.id)}
                    show={true}
                    animation={toast.animation ?? true}
                    delay={toast.delay ?? 5000}
                    autohide
                >
                    <Toast.Header className={styles.toastHeader}>
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body className={styles.toastBody}>{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default ErrorNotification;