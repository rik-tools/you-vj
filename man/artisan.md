[Rik Tools](https://github.com/rik-tools): [You VJ](../readme.md)



# Artisan
Artisan tabulates the exposing modules.


## Scripts
| Folder* | Name* |
|---------|-------|
| bin     | yvj   |


## Types
| Folder                      | Module*                | Name*                  | Value                                                                            |
|-----------------------------|------------------------|------------------------|----------------------------------------------------------------------------------|
| src/type/domain             | PlaylistItem           | PlaylistItem           | {...}                                                                            |
| src/type/domain             | PlaylistIdentity       | PlaylistIdentity       | {...}                                                                            |
| src/port/outbound           | OAuth2Client           | OAuth2Client           | Auth.OAuth2Client                                                                |
| src/port/outbound           | PlaylistConsole        | PlaylistConsole        | {...}                                                                            |
| src/port/outbound           | PlaylistGateway        | PlaylistGateway        | {...}                                                                            |
| src/port/outbound           | PlaylistItemGateway    | PlaylistItemGateway    | {...}                                                                            |
| src/port/outbound           | PlaylistItemRepository | PlaylistItemRepository | {...}                                                                            |
| src/port/outbound           | PlaylistSyncGateway    | PlaylistSyncGateway    | {...}                                                                            |
| src/adapter/outbound/oauth2 | CallbackServer         | Promisable             | (resolve: (value: OAuth2Client) => void, reject: (reason?: any) => void) => void |
| src/type/config             | YouTube                | Youtube                | youtube_v3.Youtube                                                               |
| src/type/config             | YouTube                | YTPlaylist             | youtube_v3.Schema$Playlist                                                       |
| src/type/config             | YouTube                | YTPlaylistItem         | youtube_v3.Schema$PlaylistItem                                                   |
| src/type/config             | YouTube                | YTPlaylistResponse     | Awaited <ReturnType <youtube_v3.Youtube ['playlists'] ['insert']>>               |
| src/type/config             | YouTube                | YTPlaylistItemResponse | Awaited <ReturnType <youtube_v3.Youtube ['playlistItems'] ['insert']>>           |
| src/type/config             | Secrets                | Secrets                | {...}                                                                            |
| src/type/config             | Paths                  | Paths                  | {...}                                                                            |


## Predicates
| Folder | Module | Name* | Type |
|--------|--------|-------|------|


## Procedures
| Folder             | Module              | Name*            | Type                                                            |
|--------------------|---------------------|------------------|-----------------------------------------------------------------|
| src/app/controller | ShowingController   | controlShowing   | Paths => Promise <void>                                         |
| src/app/controller | IngestingController | controlIngesting | (Paths, string) => Promise <void>                               |
| src/app/controller | EgestingController  | controlEgesting  | (Paths, string, string []) => Promise <void>                    |
| src/app/service    | ShowingService      | serviceShowing   | (PlaylistGateway, PlaylistConsole) => Promise \<void>           |
| src/app/service    | IngestingService    | serviceIngesting | (PlaylistItemGateway, PlaylistItemRepository) => Promise <void> |
| src/app/service    | EgestingService     | serviceEgesting  | PlaylistSyncGateway => Promise <void>                           |


## Functions
| Folder                      | Module                | Name*                 | Type                                                                                           |
|-----------------------------|-----------------------|-----------------------|------------------------------------------------------------------------------------------------|
| src/adapter/outbound        | CLPlaylistAdapter     | clPlaylistAdapter     | () => PlaylistConsole                                                                          |
| src/adapter/outbound        | YTPlaylistAdapter     | ytPlaylistAdapter     | OAuth2Client => Promise \<PlaylistGateway>                                                     |
| src/adapter/outbound        | YTPlaylistItemAdapter | ytPlaylistItemAdapter | (OAuth2Client, string) => Promise \<PlaylistItemGateway>                                       |
| src/adapter/outbound        | YTPlaylistSyncAdapter | ytPlaylistSyncAdapter | (OAuth2Client, string, string []) => Promise \<PlaylistSyncGateway>                            |
| src/adapter/outbound        | DBPlaylistAdapter     | dbPlaylistAdapter     | (string, string) => Promise \<Database>                                                        |
| src/adapter/outbound        | DBPlaylistItemAdapter | dbPlaylistItemAdapter | (Database, string) => Promise \<PlaylistItemRepository>                                        |
| src/adapter/outbound/oauth2 | Client                | oauth2Client          | (string, string) => Promise \<OAuth2Client>                                                    |
| src/adapter/outbound/oauth2 | LocallyDerivedClient  | locallyDerivedClient  | (OAuth2Client, string) => Promise \<OAuth2Client>                                              |
| src/adapter/outbound/oauth2 | RemotelyDerivedClient | remotelyDerivedClient | (OAuth2Client, string) => Promise \<OAuth2Client>                                              |
| src/adapter/outbound/oauth2 | CallbackServer        | callbackServer        | (OAuth2Client, string, string) => Promise \<OAuth2Client>                                      |
| src/adapter/outbound/oauth2 | RequestListener       | requestListener       | (OAuth2Client, http.Server, OAuth2Client => void, any => void, string) => http.RequestListener |
| src/adapter/outbound/oauth2 | Credentials           | credentials           | string => Promise \<Secrets>                                                                   |


## Constants
| Folder                      | Module  | Name*      | Type                      |
|-----------------------------|---------|------------|---------------------------|
| src                         | Main    | DB_PATH    | string                    |
| src                         | Main    | CREDS_PATH | string                    |
| src                         | Main    | TOKEN_PATH | string                    |
| src                         | Main    | DDL_PATH   | string                    |
| src                         | Main    | DML_PATH   | string                    |
| src                         | Main    | paths      | Paths                     |
| src/adapter/outbound/oauth2 | Client  | OAuth2     | typeof google.auth.OAuth2 |


## Cases
| Folder                      | Module                     | Case*                                                                        |
|-----------------------------|----------------------------|------------------------------------------------------------------------------|
| tst/app/controller          | ShowingController.test     | it constructs ports and delegates to the showing service                     |
| tst/app/controller          | IngestingController.test   | it constructs ports and delegates to the ingesting service                   |
| tst/app/controller          | EgestingController.test    | it constructs ports and delegates to the egesting service                    |
| tst/app/service             | ShowingService.test        | it calls playlistGateway and playlistConsole                                 |
| tst/app/service             | IngestingService.test      | it calls playlistItemGateway and playlistItemRepository                      |
| tst/app/service             | EgestingService.test       | it calls playlistSyncGateway                                                 |
| tst/adapter/outbound        | CLPlaylistAdapter.test     | it prints a single identity correctly                                        |
| tst/adapter/outbound        | CLPlaylistAdapter.test     | it prints multiple identities in order                                       |
| tst/adapter/outbound        | CLPlaylistAdapter.test     | it prints nothing for an empty list                                          |
| tst/adapter/outbound        | DBPlaylistAdapter.test     | it opens a database and executes the DDL                                     |
| tst/adapter/outbound        | DBPlaylistItemAdapter.test | it replaces an existing row on duplicate id                                  |
| tst/adapter/outbound        | DBPlaylistItemAdapter.test | it upserts a single item and reads it back correctly                         |
| tst/adapter/outbound        | DBPlaylistItemAdapter.test | it upserts multiple items and all persist correctly                          |
| tst/adapter/outbound        | YTPlaylistAdapter.test     | it filters out items missing id or snippet title                             |
| tst/adapter/outbound        | YTPlaylistAdapter.test     | it maps a normal response to PlaylistIdentity array                          |
| tst/adapter/outbound        | YTPlaylistAdapter.test     | it returns an empty array when items is empty                                |
| tst/adapter/outbound        | YTPlaylistItemAdapter.test | it filters out items missing videoId                                         |
| tst/adapter/outbound        | YTPlaylistItemAdapter.test | it maps a normal response to PlaylistItem array                              |
| tst/adapter/outbound        | YTPlaylistItemAdapter.test | it returns an empty array when items is null or undefined                    |
| tst/adapter/outbound        | YTPlaylistItemAdapter.test | it substitutes defaults for missing optional fields                          |
| tst/adapter/outbound        | YTPlaylistSyncAdapter.test | it creates a playlist and inserts a single video                             |
| tst/adapter/outbound        | YTPlaylistSyncAdapter.test | it creates the playlist but inserts no videos for an empty list              |
| tst/adapter/outbound        | YTPlaylistSyncAdapter.test | it inserts multiple videos in order                                          |
| tst/adapter/outbound/oauth2 | Client.test                | it exits when credentials file is not found                                  |
| tst/adapter/outbound/oauth2 | Client.test                | it falls back to remotely derived client when local derivation fails         |
| tst/adapter/outbound/oauth2 | Client.test                | it returns a locally derived client when token is valid                      |
| tst/adapter/outbound/oauth2 | Credentials.test           | it parses an installed credentials file correctly                            |
| tst/adapter/outbound/oauth2 | Credentials.test           | it parses a web credentials file correctly                                   |
| tst/adapter/outbound/oauth2 | Credentials.test           | it throws when the credentials file is not found                             |
| tst/adapter/outbound/oauth2 | LocallyDerivedClient.test  | it refreshes and persists the token when expired                             |
| tst/adapter/outbound/oauth2 | LocallyDerivedClient.test  | it returns the client with credentials set when token is valid               |
| tst/adapter/outbound/oauth2 | LocallyDerivedClient.test  | it throws when the token file is not found                                   |
| tst/adapter/outbound/oauth2 | RemotelyDerivedClient.test | it generates the auth url and delegates to callbackServer                    |
| tst/adapter/outbound/oauth2 | CallbackServer.test        | it attaches the request listener, opens the auth url and resolves the client |
| tst/adapter/outbound/oauth2 | RequestListener.test       | it rejects when an error is thrown during token exchange                     |
| tst/adapter/outbound/oauth2 | RequestListener.test       | it rejects when a request arrives at an unrecognised path                    |
| tst/adapter/outbound/oauth2 | RequestListener.test       | it rejects when the callback arrives with no code                            |
| tst/adapter/outbound/oauth2 | RequestListener.test       | it resolves the client when a valid code is received                         |
