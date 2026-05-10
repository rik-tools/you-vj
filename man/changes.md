


# Changes
Changes records the coding activity.


## Doing

### 0.0.3 Profile Initialisation
This commit initialises the profile.  The non-OAuth2 adapters are integration-tested.
* src/adapter/outbound/oauth2/Client.ts
* src/adapter/outbound/oauth2/CallbackServer.ts
* src/adapter/outbound/oauth2/Credentials.ts
* src/adapter/outbound/oauth2/LocallyDerivedClient.ts
* src/adapter/outbound/oauth2/RemotelyDerivedClient.ts
* src/adapter/outbound/oauth2/RequestListener.ts
* src/type/config/OAuth2Client.ts
* src/type/config/Secrets.ts
* src/type/config/YouTube.ts
* src/type/config/Paths.ts
* tst/adapter/outbound/CLPlaylistAdapter.test.ts
* tst/adapter/outbound/YTPlaylistAdapter.test.ts
* tst/adapter/outbound/YTPlaylistItemAdapter.test.ts
* tst/adapter/outbound/YTPlaylistSyncAdapter.test.ts
* tst/adapter/outbound/DBPlaylistItemAdapter.test.ts
* tst/adapter/outbound/oauth2/Client.test.ts
* tst/adapter/outbound/oauth2/Credentials.test.ts
* tst/adapter/outbound/oauth2/LocallyDerivedClient.test.ts
* tst/adapter/outbound/oauth2/RemotelyDerivedClient.test.ts
* tst/adapter/outbound/oauth2/CallbackServer.test.ts
* tst/adapter/outbound/oauth2/RequestListener.test.ts


## To Do

### 0.0.4 Product Initialisation
This commit initialises the product.  The controllers are component-tested.
* ...

### 0.0.5 ...
This commit ...
* ...


## Done

### 0.0.2 Program Initialisation
This commit initialises the program.  It provides the program, documents and some spikes.  The services are unit-tested.
* bin/yvj
* man/artisan.md
* man/builder.md
* man/changes.md
* man/system.md
* man/tutorial.md
* man/utility.md
* src/Main.ts
* src/type/domain/PlaylistItem.ts
* src/type/domain/PlaylistIdentity.ts
* src/app/controller/ShowingController.ts
* src/app/controller/IngestingController.ts
* src/app/controller/EgestingController.ts
* src/app/service/ShowingService.ts
* src/app/service/IngestingService.ts
* src/app/service/EgestingService.ts
* src/adapter/outbound/CLPlaylistAdapter.ts
* src/adapter/outbound/YTPlaylistAdapter.ts
* src/adapter/outbound/YTPlaylistItemAdapter.ts
* src/adapter/outbound/YTPlaylistSyncAdapter.ts
* src/adapter/outbound/DBPlaylistItemAdapter.ts
* src/port/outbound/PlaylistConsole.ts
* src/port/outbound/PlaylistGateway.ts
* src/port/outbound/PlaylistItemGateway.ts
* src/port/outbound/PlaylistSyncGateway.ts
* src/port/outbound/PlaylistItemRepository.ts
* res/create-playlist-item.sql
* res/insert-playlist-item.sql
* tst/app/service/ShowingService.test.ts
* tst/app/service/IngestingService.test.ts
* tst/app/service/EgestingService.test.ts

### 0.0.1 Process Initialisation
This commit initialises the process.  It provides the Node, TypeScript and Vitest configuration that is needed for the project.
* readme.md
* package.json
* package-lock.json
* tsconfig.json
* tsconfig.build.json
* vitest.config.ts
* usr/authenticate.ts
* usr/create-db.ts
* usr/create-playlist.ts
* usr/insert-playlist-item.ts
* usr/playlist-item.json
* usr/readme.md

### 0.0.0 Project Initialisation
This commit initialises the project.
* .gitignore
