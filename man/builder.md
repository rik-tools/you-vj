[Rik Routine](https://github.com/rik-routine): [Chyt](../readme.md)



# Builder
Builder preserves the development workflow or, for now, is a dumping place for various commands.


## Calls
Principally,
```bash
clear; npx tsc && npm test && bin/yvj show-playlists
```
These were not all used and the repetition makes me feel that there is a more-direct way of doing this.
```bash
source path node
mkdir you-vj
cd you-vj
npm init -y
```
Modify [package.json](../package.json) to include `"type": "module"`, at the top level.
```bash
npm install --save-dev typescript @types/node @tsconfig/node20
```
See [tsconfig.json](../tsconfig.json).
```bash
npm install googleapis
```
```bash
node -v && npm -v
```
```bash
npm install googleapis open
```
```bash
npm install googleapis open
```
```bash
npx tsx src/spike.ts #7
```
```bash
npm install --save-dev tsx
```
Don't think this was used (think I downloaded latest tarzip manually)
```bash
nvm install 22
nvm use 22
nvm alias default 22
```
As above
```bash
rm -rf node_modules package-lock.json
npm install
```
```bash
sqlite3 var/yt-reorganiser.db ".schema playlist_item"
```
```bash
npm install sqlite3 sqlite
```
```bash
npm install sqlite3 --build-from-source
```
```bash
rm -rf node_modules/sqlite3
npm install sqlite3 --build-from-source
```
```bash
npm rebuild sqlite3 --build-from-source
```
```bash
npx tsx bin/create-db.ts
```
```bash
mkdir -p src/sql
touch src/sql/create-playlist-item.sql
```
```bash
npx tsx bin/create-db.ts
```
```bash
sqlite3 var/yt-reorganiser.db ".schema playlist_item"
```
```bash
ls src/ts/domain/
```
```bash
npx tsc --noEmit
```
```bash
npx tsx --type-check bin/ytdj.ts ingest ...
```
```bash
npx tsc
```
```bash
npm install --save-dev @types/google-cloud__local-auth @types/googleapis
```
```bash
npm install --save-dev @types/google-cloud__local-auth @types/googleapis
```
```bash
npm install --save-dev @types/googleapis
```
