### Visited Sites
##### by Raymond Gan

Tell you which of several sites you've already visited. It uses Coredump's [rapid history extraction through non-destructive cache timing](http://lcamtuf.coredump.cx/cachetime/chrome.html).

Basically, it tries to load these sites within the page. If a known part of the site (image, JS, or CSS file) loads quickly, that means it probably was cached and loaded before. If not, you haven't yet visited that site.
