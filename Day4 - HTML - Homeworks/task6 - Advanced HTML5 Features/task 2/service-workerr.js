self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache')
        .then(cache => {
          return cache.addAll([
            '/', // Index page
            'style.css', // Your stylesheet
            'script.js', // Your JavaScript file
            'image.jpg' // Any other static assets
          ]);
        })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(networkResponse => {
              if (networkResponse.status === 200) {
                caches.open('my-cache')
                  .then(cache => {
                    cache.put(event.request, networkResponse.clone());
                  });
              }
              return networkResponse;
            });
        })
    );
  });