### Visited Sites
##### by Raymond Gan

Tells you which of several sites you've already visited. Uses Coredump's [rapid history extraction through non-destructive cache timing](http://lcamtuf.coredump.cx/cachetime/chrome.html). Lets you edit these sites' names and URLs.

It tries to load these sites within the page. If a known part of the site (image, JS, or CSS file) loads quickly, it probably was cached and loaded before. If not, you haven't yet visited that site.

Uses Devise and Omniauth to either let you log in with login/password, or with OAuth2 (by Google, Facebook, Twitter, or LinkedIn).
