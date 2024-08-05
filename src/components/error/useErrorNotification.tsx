import { useState, useCallback } from 'react';

const useErrorNotification = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [delay, setDelay] = useState(5000);

  const sendErrorMessage = useCallback((message : string, animation = false, delay = 5000) => {
    setErrorMessage(message);
    setAnimation(animation);
    setDelay(delay);
    setShowToast(true);
  }, []);

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    errorMessage,
    showToast,
    animation,
    delay,
    sendErrorMessage,
    closeToast,
  };
};

export default useErrorNotification;