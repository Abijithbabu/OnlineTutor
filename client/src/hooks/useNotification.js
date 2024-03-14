import { useEffect } from "react";
import { useSelector } from "react-redux";

const useNotification = () => {
    const user = useSelector(state => state.data.user)
    useEffect(() => {
        main()
    })
    useEffect(() => {
        navigator.serviceWorker.ready
            .then(registration => {
                registration.active.postMessage({
                    type: 'userDetails',
                    userDetails: user
                });
            })
            .catch(error => {
                console.error('Service worker registration failed:', error);
            });

    }, [user]);
    const checkPermission = async () => {
        if (!('serviceWorker' in navigator)) {
            throw new Error('No support for service worker!');
        }

        if (!('Notification' in window)) {
            throw new Error('No support for notification API');
        }

        if (!('PushManager' in window)) {
            throw new Error('No support for Push API');
        }
    };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Notification permission not granted');
        }
    };

    const registerSW = async () => {
        const registration = await navigator.serviceWorker.register('sw.js')
        return registration;
    };

    const main = async () => {
        try {
            await checkPermission();
            await requestNotificationPermission();
            await registerSW();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return main
}

export default useNotification