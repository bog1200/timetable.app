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
const interval = setInterval(checkEvents, 1000 * 30);

self.addEventListener("unload", function() {
    console.log("Service worker unloading...");
    clearInterval(interval);

});