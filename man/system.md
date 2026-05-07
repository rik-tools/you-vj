


# System
System discusses the program implementation.


## Versions
```
you-vj$ node --version
v24.15.0
you-vj$ npm --version
11.12.1
you-vj$ sqlite3 --version
3.37.2 2022-01-06 13:25:41 872ba256cbf61d9290b571c0e6d82a20c224ca3ad82971edc46b29818d5dalt1
```


## GCP Changes
Some of this *has* to be manual so we do it all manually.

1. Create a project -- name: *You VJ* (hence, project id: *you-vj*)
2. Link a billing account -- *My Billing Account*
3. In API and Services: Enabled, enable -- *YouTube Data API v3*
4. In API and Services: OAuth Consent Screen --
   1. App Name: *You VJ*
   2. User Support Email: *me@gmail.com*
   3. Audience: *External*
   4. Contact Information: *me@gmail.com*
   5. Agree ...
5. In Google Auth Platform: Audience, add test users -- *me@gmail.com*
6. In Google Auth Platform: Data Access, add scope -- *.../auth/youtube.force-ssl*
7. In Google Auth Platform: Clients --
   1. Application Type: *Web application*
   2. Name: *You VJ Client 0*
   3. Authorised Redirect URI: *http://localhost:3000/oauth2callback*
   4. Download the JSON, as *credentials.json*, into the root of the project (for now)
