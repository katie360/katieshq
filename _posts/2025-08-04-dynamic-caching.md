---
layout: post
title: "Dynamic Caching : How to Make Your App Smarter at Runtime"
author: "Kate Ratemo"
date: 2025-08-04 12:00:00 +0300
categories: [pwa, webdev]
tags: [PWA, service-workers, caching, web-performance]
image:
  path: /assets/images/cache-img.png
  alt: "Illustration of a service worker caching static assets"
author_image:
  path: /assets/images/headshot.png
description: "Learn how dynamic caching works in Progressive Web Apps (PWAs), when to use it, and how to write clean, reliable caching strategies with Service Workers."
excerpt_separator: <!--more-->
---


## Introduction
---

In our last post, we talked about **Service Workers** and how they help websites work offline by caching important resources like your homepage, styles, and JavaScript. This is called **static caching**, and it’s done when the app is first installed.

But what happens after that?

Let’s say a user opens your PWA for the first time , they can view the homepage offline because it was pre-cached. Great. But then they click on a blog post or any page, and you’re fetching that data live from your server. What happens if they lose internet ?

Without extra caching, they’re stuck. That’s where we see **dynamic caching** coming in play.



## What is Dynamic Caching?
---

Dynamic caching is like your app learning on the go.

Instead of only storing things up-front , your app starts saving resources as users interact. So when someone opens a random page or requests their transaction history, your service worker can catch that response and store it for later just in case they come back, or go offline.

##### Why does this matter?

*   **Improves load time** - Cached content loads faster the next time it’s needed. Useful for API-based pages like reports, profiles, or lists.
    
*   **Keeps content available offline** - Static caching only saves what you define during setup. Dynamic caching stores new content as users interact with the app. This means users can still view content they opened earlier, even without internet.
    
*   **Reduces server requests**  - Once a response is cached, it’s served locally. This saves bandwidth and reduces pressure on your servers. Helpful when many users are using the app at the same time.

##### Writing Dynamic Caching Code
Now that we know why dynamic caching is useful, let’s look at how to write it in code. This is where the service worker listens to requests made while the app is running and decides what to store for offline use later.

**Example**

```js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic-cache').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
```
##### What's happening here ...

-   The service worker intercepts any fetch request.

-   It checks if the request has already been stored in the cache.

-   If yes, it just returns that.

-   If not, it fetches it from the network.

-   Then it saves a copy (cloned) to the cache before returning the response.



##### Why we need to use `clone()` ?

You can't use the same response object twice. Once it's been read, it's basically used up.
So before caching it, we create a clone. One version is saved, the other is returned to the user. Without this, your code might break or store an empty response.


    
## Cache Strategies
---


Caching strategies are just rules that tell your service worker how to handle fetch requests.

Each strategy answers one question:

> "Should I look in the cache first or go to the network?"

And 

> "What should I do if one of them fails?"

Different resources need different approaches. You wouldn't treat a CSS file the same way you treat a bank balance or a news feed. That’s where strategies help.


#### **1. Cache First**

When you're dealing with files that do not change often, such as stylesheets, JavaScript bundles, fonts, layout files, or static images, the Cache First strategy is a good fit. It works well for shared UI components, public documents, or views users return to frequently. This approach focuses on speed, consistency, and offline availability.

##### How it works

-   The service worker checks the cache before making a network request.

-   If the requested file exists in the cache, it is returned immediately.

-   If it is not found in the cache, the file is fetched from the network and saved for next time.

This helps improve loading time on repeat visits and keeps core files available even without a network connection.

**Example in action**

A user opens the app and loads the dashboard layout, fonts, and styling. These are cached on first use. On the next visit, the same files load instantly from the cache, even if the user is offline or the connection is slow.

```js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // If we already have the branding/logo/script layout cached, return it
      if (cachedResponse) return cachedResponse;

      // If not cached, fetch it from the network
      return fetch(event.request).then(networkResponse => {
        // Then cache it for future visits — useful for account summary layout, CSS, JS, etc.
        return caches.open('static-assets-cache').then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

```
#### **2. Network First**

Some data in your app changes frequently and needs to be as accurate as possible. When you're dealing with things like recent transactions, alerts, or account summaries, the Network First strategy helps ensure users see the latest version while still supporting offline fallback.

##### How it works

-   Try the network first and return the live response.

-   If successful, update the cache with the new data.

-   If the network request fails, look for and return a cached copy.

This way, users get the most current data when they're connected, and still see something useful if they lose connection.

**Example in action**

A user opens their transaction history. The app fetches the latest records from the server and caches them. If they check again while offline, the app can still show the most recent copy that was saved.

```js
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(networkResponse => {
      // Store the latest account or transaction data
      return caches.open('user-data-cache').then(cache => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
    }).catch(() => {
      // If offline, return previously saved data
      return caches.match(event.request);
    })
  );
});
```
#### **3. Stale While Revalidate**

This strategy gives users fast access to cached content while still making sure the data is refreshed in the background. It’s useful when speed is important, but the data doesn’t have to be perfectly up to date every time. It keeps your app responsive while quietly updating things for the next visit.

##### How it works
- The service worker checks the cache first.

- If a cached version exists, it is returned immediately.

- At the same time, a network request is made in the background.

- If the network response is successful, it replaces the cached version.

- This keeps the app fast while preparing fresher content for the next visit.

**Example in action**

A user opens a holdings summary page. The cached data loads right away so they don’t have to wait. In the background, the app fetches an updated version. The next time they visit, the latest data is already available.

```js

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('summary-cache').then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // Always fetch in the background
        const fetchUpdate = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });

        // Return cached data immediately if available, else wait for network
        return cachedResponse || fetchUpdate;
      });
    })
  );
});
```
#### **4. Cache Only**

The Cache Only strategy serves content only from the cache. It does not attempt any network request at all. This works well for fully offline apps or for specific assets that are guaranteed to be available in the cache already.

##### How it works

-   The service worker checks the cache for the requested resource.

-   If the resource exists in the cache, it is returned.

-   If it is not found, the request fails , no network fallback is attempted.

This approach is simple and predictable, but only works when you're confident the file is already cached.

**Example in action**

A user opens a report they saved for offline use. The app serves the file directly from the cache without trying to contact the server. If the file isn't in the cache, the request fails.

```js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
  );
});
```
#### **A few things to keep in mind**

-   Only cache **GET** requests. Avoid caching **POST** or anything that modifies data.

-   Always **clone** the response before caching it. It's easy to forget but critical.

-   Dynamic caches grow quickly. Plan for cleanup, versioning, or limits.

-   Never cache personal or sensitive data unless you're doing it securely.

-   Always handle fetch errors and include a fallback, so your app doesn't break offline.

## Advanced Tips
---

##### 1. Runtime route-based strategies

You don't have to treat every route the same. You can set different caching behavior based on what type of request it is.

Example:
```js
if (event.request.url.includes('/api/reports')) {
  // Network First
} else if (event.request.url.endsWith('.js') || event.request.url.endsWith('.css')) {
  // Cache First
}
```

This gives you more control and avoids overcaching or undercaching important paths.



##### 2. Fallbacks for offline use

If something fails to load (like a page or image), your service worker can return a default version instead.

Example:
``` js
event.respondWith(
  fetch(event.request).catch(() => {
    return caches.match('/offline.html');
  })
);
```

You can also do this for images:
```js
if (event.request.destination === 'image') {
  event.respondWith(
    fetch(event.request).catch(() => caches.match('/images/default.png'))
  );
}
```

##### 3. Handling large assets

For things like charts, PDF reports, or videos:

-   Cache them conditionally or on demand

-   Use separate caches with different rules

-   Consider cache limits or user-triggered downloads i.e don’t store full datasets by default wait until the user requests them.

## Conclusion
---

Dynamic caching lets your app store things as users interact with it, not just during installation. It helps improve speed, keep the app useful offline, and reduce pressure on the network.

The key is to cache the right content at the right time, and serve it in a way that makes the experience smooth.

In the next post, we'll look at how to manage your cache properly, including versioning, cleaning up old data, and keeping things under control