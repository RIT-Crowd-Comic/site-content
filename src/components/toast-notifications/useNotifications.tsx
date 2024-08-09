import { useState } from 'react';
import { ToastData } from './interfaces';

const useNotification = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    /**
   * Adds a toast to the array and sets up its values
   * @param message 
   * @param title 
   * @param animation 
   * @param delay 
   */
    const addToast = (message: string, title: string, animation = false, delay = 5000, isError = true) => {
        const newToast = {
            id: Date.now(), // Unique ID for each toast
            message,
            title,
            delay,
            animation,
            isError
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    /**
    * removes a toast based on its id(date)
    * @param id 
    */
    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return {
        toasts,
        addToast,
        removeToast,
    };
};

export default useNotification;
