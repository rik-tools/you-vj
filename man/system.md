[Rik Tools](https://github.com/rik-tools): [You VJ](../readme.md)



# System
System discusses the program implementation.


## Versions
```
you-vj$ node --version
v24.15.0
you-vj$ npm --version
11.12.1
you-vj$ sqlite3 --version
3.37.2 2022-01-06 13:25:41
```


## Testing
This is not right.
| Type        | Focus          | Tool(s)      |
|-------------|----------------|--------------|
| Unit        | app/service    | Vitest       |
| Integration | adapter        | Vitest       |
| Component   | app/controller | Vitest       |
| End-to-End  | ...?           | Vitest, MSW? |


## Short-Comings
1. The project has been set up to use MSW but it doesn't.  The tight coupling between the G auth object and the API calls doesn't straightforwardly lend itself to this kind of testing, which was one of the objectives of this exercise :(
2. It feels as if the app should be able to delete lists.
3. It might be worth having a Bash script that shows-ingests-egests-deletes-reverses, although that is (will be) all covered in the tutorial.


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
