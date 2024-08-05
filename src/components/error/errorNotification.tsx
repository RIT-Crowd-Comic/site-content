import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import styles from './error.module.css'

const ErrorNotification = (
    ({
        message,
        show,
        onClose,
        delay,
        animation
    }: {
        message: string,
        show: boolean,
        onClose: () => void,
        delay: number,
        animation: boolean
    }) => {
    return (
        <ToastContainer className={styles.toastContainer} position="bottom-center">
            <Toast onClose={onClose} show={show} animation={animation} delay={delay} autohide>
                <Toast.Header className={styles.toastheader}>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className={styles.toastBody}>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
});

export default ErrorNotification;