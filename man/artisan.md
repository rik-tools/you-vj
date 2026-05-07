[Rik Tools](https://github.com/rik-tools): [You VJ](../readme.md)



# Artisan
Artisan tabulates the exposing modules.


## Scripts
| Folder* | Name* |
|---------|-------|
| bin     | yvj   |


## Types
| Folder | Module*                                | Name*                  | Value                          |
|--------|----------------------------------------|------------------------|--------------------------------|
| src    | adapter/outbound/OAuth2Client          | OAuth2Client           | OAuth2Client                   |
| src    | adapter/outbound/OAuth2Client          | Executor               | ...                            |
| src    | adapter/outbound/YTPlaylistAdapter     | OAuth2Client           | OAuth2Client                   |
| src    | adapter/outbound/YTPlaylistAdapter     | Youtube                | youtube_v3.Youtube             |
| src    | adapter/outbound/YTPlaylistAdapter     | Schema$Playlist        | youtube_v3.Schema$Playlist     |
| src    | adapter/outbound/YTPlaylistItemAdapter | OAuth2Client           | OAuth2Client                   |
| src    | adapter/outbound/YTPlaylistItemAdapter | Youtube                | youtube_v3.Youtube             |
| src    | adapter/outbound/YTPlaylistItemAdapter | Schema$PlaylistItem    | youtube_v3.Schema$PlaylistItem |
| src    | adapter/outbound/YTPlaylistSyncAdapter | OAuth2Client           | OAuth2Client                   |
| src    | adapter/outbound/YTPlaylistSyncAdapter | Youtube                | youtube_v3.Youtube             |
| src    | adapter/outbound/YTPlaylistSyncAdapter | YTPlaylistResponse     | Awaited \<ReturnType \<...\>\> |
| src    | adapter/outbound/YTPlaylistSyncAdapter | YTPlaylistItemResponse | Awaited \<ReturnType \<...\>\> |
| src    | app/controller/ShowingController       | OAuth2Client           | OAuth2Client                   |
| src    | app/controller/IngestingController     | OAuth2Client           | OAuth2Client                   |
| src    | app/controller/EgestingController      | OAuth2Client           | OAuth2Client                   |


## Interfaces
| Folder | Module                               | Name*                  |
|--------|--------------------------------------|------------------------|
| src    | domain/PlaylistItem                  | PlaylistItem           |
| src    | domain/PlaylistIdentity              | PlaylistIdentity       |
| src    | adapter/outbound/OAuth2client        | Secrets                |
| src    | port/outbound/PlaylistConsole        | PlaylistConsole        |
| src    | port/outbound/PlaylistGateway        | PlaylistGateway        |
| src    | port/outbound/PlaylistItemGateway    | PlaylistItemGateway    |
| src    | port/outbound/PlaylistSyncGateway    | PlaylistSyncGateway    |
| src    | port/outbound/PlaylistItemRepository | PlaylistItemRepository |


## Functions
| Folder | Module                                  | Name*                  | Type                               |
|--------|-----------------------------------------|------------------------|------------------------------------|
| src    | adapter/outbound/ConsolePlaylistAdapter | consolePlaylistAdapter | PlaylistConsole                    |
| src    | adapter/outbound/OAuth2Client           | oauth2Client           | Promise \<OAuth2Client\>           |
| src    | adapter/outbound/YTPlaylistAdapter      | ytPlaylistAdapter      | Promise \<PlaylistGateway\>        |
| src    | adapter/outbound/YTPlaylistItemAdapter  | ytPlaylistItemAdapter  | Promise \<PlaylistItemGateway\>    |
| src    | adapter/outbound/YTPlaylistSyncAdapter  | ytPlaylistSyncAdapter  | Promise \<PlaylistSyncGateway\>    |
| src    | adapter/outbound/DBPlaylistItemAdapter  | dbPlaylistItemAdapter  | Promise \<PlaylistItemRepository\> |


## Procedures
| Folder | Module                             | Name*                |
|--------|------------------------------------|----------------------|
| src    | app/controller/ShowingController   | controlShowing       |
| src    | app/controller/IngestingController | controlIngesting     |
| src    | app/controller/EgestingController  | controlEgesting      |
| src    | app/service/ShowingService         | showPlaylists        |
| src    | app/service/IngestingService       | persistPlaylistItems |
| src    | app/service/EgestingService        | persistPlaylistSync  |


## Predicates
| Folder | Module | Name* |
|--------|--------|-------|


## Constants
| Folder | Module                             | Name*               | Type                   |
|--------|------------------------------------|---------------------|------------------------|
| src    | adapter/outbound/DBPlaylistAdapter | \__dirname          | string                 |
| src    | adapter/outbound/DBPlaylistAdapter | DB_PATH             | string                 |
| src    | adapter/outbound/DBPlaylistAdapter | SQL_PATH_0          | string                 |
| src    | adapter/outbound/DBPlaylistAdapter | SQL_PATH_1          | string                 |
| src    | adapter/outbound/OAuth2Client      | OAuth2              | google.auth.OAuth2     |
| src    | adapter/outbound/OAuth2Client      | CREDS_PATH          | string                 |
| src    | adapter/outbound/OAuth2Client      | TOKEN_PATH          | string                 |
| tst    | app/service/ShowingService         | mockPlaylistGateway | PlaylistGateway        |
| tst    | app/service/ShowingService         | mockPlaylistConsole | PlaylistConsole        |
| tst    | app/service/IngestingService       | mockGateway         | PlaylistItemGateway    |
| tst    | app/service/IngestingService       | mockRepository      | PlaylistItemRepostiory |
| tst    | app/service/EgestingService        | mockGateway         | PlaylistSyncGateway    |
