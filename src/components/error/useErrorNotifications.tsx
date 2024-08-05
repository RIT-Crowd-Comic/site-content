import { useState } from 'react';

interface ToastData {
  id: number;
  message: string;
  title: string;
  delay?: number;
  animation?: boolean;
}
const useErrorNotification = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  
  
  /**
   * Adds a toast to the array and sets up its values
   * @param message 
   * @param title 
   * @param animation 
   * @param delay 
   */
  const addErrorMessage = (message: string, title: string, animation = false, delay = 5000) => {
    const newToast = {
      id: Date.now(), // Unique ID for each toast
      message,
      title,
      delay,
      animation,
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
    addErrorMessage,
    removeToast,
  };
};

export default useErrorNotification;