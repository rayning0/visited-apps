### Visited Sites
##### by Raymond Gan

Tells you which of several sites you've already visited. Uses Coredump's [rapid history extraction through non-destructive cache timing](http://lcamtuf.coredump.cx/cachetime/chrome.html).

Tries to load these sites within the page. If a known part of the site (image, JS, or CSS file) loads quickly, it probably was cached and loaded before. If not, you haven't yet visited that site.

Uses Devise and Omniauth to either let you log in with login/password, or with OAuth2 (by Google, Facebook, Twitter, or LinkedIn).

Lets you add/edit/delete sites the program checks. If database is empty, run `rake db:seed` to repopulate database with 5 basic sites.
