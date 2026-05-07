


# You VJ Usr
This folder contains some scripts that served as spikes.


## Authenticating
[authenticate.ts](authenticate.ts) authenticates with YT and retrieves 50 playlists.

### Running
1. We attempt to configure the OAuth2 client with a token.json.
2. If that fails, we fall back to authenticating (see below).
3. We authorise with YT.
4. We request some parts of 50 YT playlists.
5. We write each response-present playlist to the console.

### Authenticating
1. We create a server to serve the 'oauth2callback' endpoint:
    1. when a request to that EP comes in, we take a code from the query params;
    2. then we write the response and stop serving that EP by destroying the server;
    3. we ensure that the code is nonnull before accessing the tokens with which we configure the OAC;
    4. all being well, we invoke resolve; otherwise, we reject the exception.
2. We set up some event listeners (a.k.a. callback handlers), which can access the promise arguments.
3. We attach a destroy-method to the server.
4. We begin listening for requests made to the OAC EP.
5. (It is from this point that we might expect the if-condition request-checking to occur.)


## Creating a Playlist
[create-playlist.ts](create-playlist.ts) creates a new playlist on YT.

### Running
1. Load the credentials and token; configure the OAuth client
2. If that fails, fall over
3. Authorise with YT
4. Insert the playlist
5. Write some detail to the console


## Creating the Database
[create-db.ts](create-db.ts) creates the database and a table.

### Running
1. Set up the paths, relative to the script
2. Read the SQL command from the source file
3. Ensure that the 'var' directory exists
4. Open (and potentially create) the database
5. Execute the creation logic (which only happens if necessary)
6. Exit gracefully


## Inserting a Playlist Item
[insert-playlist-item.ts](insert-playlist-item.ts) inserts a record into the table.

### Running
1. Set up the paths, relative to the script
2. Read the SQL from the source file
3. Connect to the database
4. Execute the insertion logic
5. Exit gracefully
