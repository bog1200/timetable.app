"use client"
export async function scheduleNotification(eventTitle: string, eventStartTime: string) {
    if (Notification.permission === "granted" && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {
            return registration.active!.postMessage({ eventTitle, eventStartTime });
        });
    }
}
export async function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }
}