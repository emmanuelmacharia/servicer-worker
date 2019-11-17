// MAKE SURE SERVICE WORKERS ARE SUPPORTED

if(navigator.serviceWorker){
    console.log('service worker supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw_cached_pages.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log(`Service worker error ${err}`))
    });

}


// MANIFEST EVENTS

//before install prompt
window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();

    // save the event for later
    promptEvent = event;

    if (promptEvent !== undefined){
        // show install baner now
        promptEvent.prompt();

        promptEvent.userChoice.then(choice => {
            console.log('User choice: ', choice.outcome);
        })
    }
    return false;
});

// on app install
window.addEventListener('appinstalled', event => {
    console.log('the App was instaled');
})