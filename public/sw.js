importScripts('https://cdnjs.cloudflare.com/ajax/libs/luxon/3.0.1/luxon.min.js');

self.addEventListener('install', function() {
    console.log('Service worker installed');
});

self.addEventListener('activate', function() {
    console.log('Service worker activated');

});


self.addEventListener('push', function(event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/vercel.svg'
    }).then(() => {
        console.log('Notification shown');
    });
});

function checkEvents() {
    console.log('Checking events...');
    fetch('/api/events/getStarting')
        .then(response => response.json())
        .then(data => {
            console.log("DATA: "+data);
            console.log(JSON.stringify(data));
            console.log(data.events.length + " events found");
            if (data.events.length === 0) {
                return;
            }
            data.events.forEach(event => {
                    const {title} = event;
                    self.registration.showNotification("Event Reminder", {
                        body: `Your event "${title}" is starting now!`,
                        icon: '/icon.png'
                    });
                }
            );
        });
}

checkEvents();
const interval = setInterval(checkEvents, 1000 * 10);

self.addEventListener("unload", function() {
    console.log("Service worker unloading...");
    clearInterval(interval);

});

// self.addEventListener('message', function(event) {
//     const { eventTitle, eventStartTime } = event.data;
//     const now = luxon.DateTime.now()
//     const delay = luxon.DateTime.fromISO(eventStartTime).diff(now).as('milliseconds');
//     console.log('Received message:', event.data);
//     console.log('Delay:', delay);
//     console.log("Event scheduled for:", eventStartTime);
//
//     if (delay > 0) {
//         setTimeout(() => {
//             self.registration.showNotification("Event Reminder", {
//                 body: `Your event "${eventTitle}" is starting now!`,
//                 icon: '/icon.png'
//             });
//         }, delay);
//     }
// });