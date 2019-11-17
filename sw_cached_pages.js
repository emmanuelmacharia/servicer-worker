const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    'index.html',
    'about.html',
    '/css/styles.css',
    '/js/main.js'
]


//  CALL  THE INSTALL EVENT

self.addEventListener('install', event => {
    console.log('Service worker Installed');

    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            console.log('Service Worker caching');
            cache.addAll(CACHE_ASSETS);
        })
        .then(() => self.skipWaiting())
    );
});

//  ACTIVATE --> this is where you clean up the old cache
self.addEventListener('activate', event => {
    console.log('Service worker activated');
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service worker clearing old cache');
                        return caches.delete(cache);
                    };
                })
            );
        })
    );
});

// CALL THE FETCH EVENT

self.addEventListener('fetch', (event) => {
    console.log('Service worker fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})
