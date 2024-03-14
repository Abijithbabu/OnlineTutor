let user
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const data = { subscription, id: user?._id }
    const response = await fetch(`https://onlinetutor-server.onrender.com/notification/save-subscription`, {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(data)
    })

    return response.json()
}

self.addEventListener("activate", async (e) => {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BKXDJ3DYbMrOvqxKkd4I0P5Nn9RfP4GEFl3DI_4EkFE1re1bbZ6-sGVWi5oKFI74ReywZM7cEynR65SftiQN9fs")
        })
        const response = await saveSubscription(subscription)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
})

self.addEventListener("push", e => {
    const data = e.data.json();
    const { text, url, title, image } = data
    const options = {
        body: text,
        icon: 'apple-touch-icon.png',
        image,
        actions: [
            { action: 'open_url', title: 'JOIN NOW' }
        ],
        url
    };
    self.registration.showNotification(title, options);
})

self.addEventListener('message', event => {
    if (event?.data && event.data?.type === 'userDetails') {
        user = event?.data?.userDetails;
    }
});

self.addEventListener('notificationclick', event => {
    const action = event?.action;
    if (action === 'open_url') {
        const url = event?.notification?.url;
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});